(function() {
    // Variables for HTML elements (sectons) / Button 'stop-publishing'
    const statisticsSection = document.getElementById('statistics');
    const articlesSection = document.getElementById('published-articles');
    const stopBtn = document.getElementById('stop-publishing');
    
    
    // The statistics obj is used to keep track of statistics
    const statistics = {};
    Touratte.authorsList.map((author) => { 
        statistics[author._id] = 0;
    });
    
    
    // Event listeners for 'shout' and 'click' events.
    // The handler for 'shout' is the publishArticle function.
    // The handler for 'click' (on 'stop-publishing' btn) is the
    // stop publishing function.
    document.addEventListener( 'shout', publishArticle );
    stopBtn.addEventListener( 'click', stopPublishing );

    /**
     * The function creates the table with statistics and appends
     * the table to statisticsSection
     */
    (function initializeStatistics() {
        const table = document.createElement('table');
        
        // Iterate all authors, creating for each a row and appending
        // this row to the table.
        Touratte.authorsList.map((author) => {
            const authorRow = document.createElement('tr');

            const authorName = document.createElement('td');
            authorName.innerHTML = author.name;
            
            // Add attrible data-author-id to access the td element
            // while updating statistics
            const articlesCount = document.createElement('td');
            articlesCount.innerHTML = 0;
            articlesCount.setAttribute( 'data-author-id', author._id );

            authorRow.append( authorName, articlesCount );
            table.append( authorRow );
        });

        statisticsSection.append( table );
    })();

    
    /**
     * The function creates HTML element for the 'article', updates statistics,
     * appends the created element to the 'articlesSection' and highlights
     * the new article for 1 second.
     */
    function publishArticle(e) {
      const { author, text } = e.detail;
      const article = createArticleHTML( author, text );

      updateStatistics( author );
      articlesSection.append( article );
      highlightArticle( article );
    }


    /**
     * The function creates a block with two paragraphs: text and author name.
     * @param {Object} author The object that contains id/name of the author.
     * @param {String} text The randomly generated text (article).
     * @return {Object} HTML DIV element with article.
     */
    function createArticleHTML(author, text) {
      const article = document.createElement('div');

      const articleText = document.createElement('p');
      articleText.innerHTML = text;
        
      const authorSignature = document.createElement('p');
      authorSignature.innerHTML = author.name;
      authorSignature.classList.add('signature');

      article.append( articleText );
      article.append( authorSignature );


      return article;
    }


    /**
     * The function updates the statistics object, changes innerHTML of the needed
     * td element of the statistics table.
     * @param {Object} author The object that contains id/name of the author.
     */
    function updateStatistics(author) {
        const newCount = ++statistics[author._id];
        
        const selector = `[data-author-id = "${author._id}"]`;
        const tableColumn = document.querySelector( selector );
        
        tableColumn.innerHTML = newCount;
    }

    /**
     * The function sets the background to be yellow, and 1 second later
     * changes the background to the default color
     * @return {Object} HTML DIV element with article.
     */
    function highlightArticle(article) {
        article.style.background = '#FFDC00'; // should change
        setTimeout(() => {
            article.style.background = '';
        }, 1000);
    }


    /**
     * The function clearsTimeout, so the function triggerShoutEvent from
     * the touratte.js module is no longer called
     */
    function stopPublishing() {
        clearTimeout( Touratte.eventTimer );
        alert( 'The publishing has been stopped successfully!' );
    }
})();
document.addEventListener('shout', appendQuotation);


function appendQuotation(e) {
  console.log( e.detail );
  const quote = document.createElement('blockquote');
  const text = e.detail.text;
  const author = e.detail.author;
  
  const textParagraph = document.createElement('p');
  textParagraph.innerHTML = text;
  
  const authorNameParagraph = document.createElement('p');
  authorNameParagraph.innerHTML = author.name;
  authorNameParagraph.classList.add('align-left');
  
  quote.append( textParagraph );
  quote.append( authorNameParagraph );
  
  document.body.append( quote );
}
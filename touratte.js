/**
 * In the global space the timer key for clearTimeout and authorsList will
 * be available as a properties of Touratte object.
 */
const Touratte = (function() {
    // list of authours with unique IDs
    const authorsList = [
      {
        _id: 1,
        name: 'Todd',
      },
      {
        _id: 2,
        name: 'Rob',
      },
      {
        _id: 3,
        name: 'Sevil',
      },
    ];
  
    
    // Call the recursive triggerShoutEvent function in 1-5s.
    let eventTimer = setTimeout( triggerShoutEvent, randInt(1000, 5000) );
    
    
    /**
     * Triggers shout event once in 1-5s, redeclaring eventTimer property in
     * touratteModule obj, which is the key for clearTimeout. Works recursively.
     * @return {Undefined}
     */
    function triggerShoutEvent() {
      let shoutEvent = createShoutEvent();
      document.dispatchEvent( shoutEvent );
        
      touratteModule.eventTimer = setTimeout( triggerShoutEvent, randInt(1000, 5000) );
    }
    
    
    /**
     * Creates event with name shout and detail with the random 
     * author from authorList and randomly generated text.
     * @return {Object} The event with name shout.
     */
    function createShoutEvent() {
        return new CustomEvent('shout', {
          detail: {
              text: generateText( 60 ),
              author: authorsList[randInt( 0, authorsList.length - 1 )]
          }
      });
    }
    
    
    /**
     * Generates random text, using characters from range 1040 - 1103
     * @param {Number} len The length of the text.
     * @return {String} The randomly generated text.
     */
    function generateText(len) {
      let str = '';

      for (let i = 0; i < len; i++) {
        let charCode = randInt( 1040, 1103 );
        str += String.fromCharCode( charCode );
      }

      return str;
    }

    
    /**
     * Generates random integers within the specified range.
     * @param {Number} min The lower bound of the random number.
     * @param {Number} The The upper bound of the random number.
     * @return {Number} The randomly generated number.
     */
    function randInt(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
    
    // to export
    const touratteModule = {
        eventTimer: eventTimer,
        authorsList: authorsList
    };
    
    return touratteModule;
})();
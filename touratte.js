const authorsList = [
  {
    _id: 1,
    name: 'Todd',
  },
  {
    _id: 3,
    name: 'Rob',
  },
  {
    _id: 3,
    name: 'Sevil',
  },
];


const shoutEvent = new CustomEvent('shout', { cancelable: true } );

function generateText(len) {
  let str = '';

  for (let i = 0; i < len; i++) {
    let charCode = randInt( 1040, 1103 );
    str += String.fromCharCode( charCode );
  }
  
  return str;
}

function randInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}


let shoutDispatcher = setTimeout(function initShoutEvent() {
  document.dispatchEvent( shoutEvent );
  shoutDispatcher = setTimeout( initShoutEvent, randInt(1000, 5000) );
}, randInt(1000, 5000));


setTimeout(() => {
  clearTimeout(shoutDispatcher);
  console.log('done');
}, 10000);

// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
function hideErrorModal(){
  document.querySelector('#modal').classList.add('hidden')
}

//when page loads, invoke functions
generalClickListener();

//When a user clicks on an empty heart Invoke `mimicServerCall` to simulate making a server request


function generalClickListener(){
  document.addEventListener('click', (e) => {
    // if what I click is the heart then do something
    if (e.target.classList.value === 'like-glyph'){
      // then invoke mimicServer
      mimicServerCall()
        .then(resp => {
          // When the "server" returns a success status: Change the heart to a full and red
          if (e.target.innerText === EMPTY_HEART){
            e.target.innerText = FULL_HEART;
            e.target.classList.add('activated-heart');
            return e.target.innerText;
          }else{
            e.target.innerText = EMPTY_HEART;
            e.target.classList.remove('activated-heart'); 
        }})

        .catch(error => {
          // Display the error modal by removing the `.hidden` class
          document.querySelector('#modal').classList.remove('hidden');
          // Display the server error message in the modal
          document.querySelector('#modal').innerText = error;
          // Use `setTimeout` to hide the modal after 3 seconds (add the `.hidden` class)
          setTimeout(hideErrorModal, 3000)
        })
    }})
  };

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

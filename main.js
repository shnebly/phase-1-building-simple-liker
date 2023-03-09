// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
function hideErrorModal(){
  document.querySelector('#modal').classList.add('hidden')
}
//When a user clicks on an empty heart Invoke `mimicServerCall` to simulate making a server request

// heart.classList.toggle('activated-heart');

// here we are grabbing the class but since it selects all the hearts on the page we need to iterate through them and add separate listen events per each heart
const hearts = document.querySelectorAll('.like-glyph');
for(let heart of hearts){
  heart.addEventListener('click', function generalClickListener(e) {
  const like = e.target
  mimicServerCall()
  .then(resp => {
    if (like.innerText === EMPTY_HEART){
      like.innerText = FULL_HEART;
      // like.className = 'activated-heart'; --> another way that works
      like.classList.add('activated-heart');
    }else{
      like.innerText = EMPTY_HEART;
      // like.className = ''; --> another way that works
      like.classList.remove('activated-heart');
  }
})
  .catch(error => {
    // Display the error modal by removing the `.hidden` class
    document.querySelector('#modal').classList.remove('hidden');
    // Display the server error message in the modal
    document.querySelector('#modal').innerText = error;
    // Use `setTimeout` to hide the modal after 3 seconds (add the `.hidden` class)
    setTimeout(hideErrorModal, 3000)
  })
}
)}


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

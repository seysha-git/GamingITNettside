let userNameInput = document.querySelector('#userNameInput')
let avatars = document.querySelectorAll('.avatarIcon')
let signIn = document.querySelector('.signIn')
let profileUsername = document.querySelector('#userName')
let profileUserIcon = document.querySelector('#userIcon')
let profileUserPoints = document.querySelector('#userPoints')
let userGame = document.querySelector('#userGame')

// Makes sure that the userPoints are always updated
// Check defaultStore.js for explination of the 3 functions below
let getUserInput = () => {
  let nameInput = userNameInput.value;
  profileUsername.innerHTML = nameInput;
  
  // Retrieve previously saved points from sessionStorage
  let points = parseInt(sessionStorage.getItem('profilePoints')) || 0;
  profileUserPoints.innerHTML = `| ${points} pts`;

  
  sessionStorage.setItem('profileUserName', nameInput);
}

  let getUserAvatar = () => {
    avatars.forEach(avatar => {
      avatar.addEventListener('click', () => {
        let selectedAvatar = avatar.parentElement.id;
        avatars.forEach(a => a.classList.remove('activeAvatar'));
        avatar.classList.add('activeAvatar');
        if(selectedAvatar == 'avatarGif') {
          profileUserIcon.innerHTML = `<img src="../../Images/Avatars/avatarGif.png" height="45px" width="45px" class="avatarIcon" />`;
        } else if(selectedAvatar == 'avatarElf') {
          profileUserIcon.innerHTML = `<img src="../../Images/Avatars/avatarElf.png" height="45px" width="45px" class="avatarIcon" />`;
        } else {
          profileUserIcon.innerHTML = `<img src="../../Images/Avatars/avatarDog.png" height="45px" width="45px" class="avatarIcon" />`;
        }
        sessionStorage.setItem('selectedAvatar', selectedAvatar);
      });
    });
  }
  
  let getUser = () => {
    const savedName = sessionStorage.getItem('profileUserName') || '';
    const savedPoints = parseInt(sessionStorage.getItem('profilePoints')) || 0;
    if (savedName) {
      profileUsername.innerHTML = savedName;
    }
    profileUserPoints.innerHTML = `| ${savedPoints} pts`;
    
    const savedAvatar = sessionStorage.getItem('selectedAvatar');
    if (savedAvatar) {
      if (savedAvatar == 'avatarGif') {
        profileUserIcon.innerHTML = `<img src="../../Images/Avatars/avatarGif.png" height="45px" width="45px" class="avatarIcon" />`;
      } else if (savedAvatar == 'avatarElf') {
        profileUserIcon.innerHTML = `<img src="../../Images/Avatars/avatarElf.png" height="45px" width="45px" class="avatarIcon" />`;
      } else {
        profileUserIcon.innerHTML = `<img src="../../Images/Avatars/avatarDog.png" height="45px" width="45px" class="avatarIcon" />`;
      }
    }

    userGame.innerHTML = savedName
  }
  
  window.addEventListener('load', getUser);
  getUserAvatar();
  signIn.addEventListener('click', getUserInput);

  

const cards = document.querySelectorAll('.card');
const timerText = document.querySelector("#time")
const flipsText = document.querySelector("#flips")
let matchedCard = 0
let flips = 0
let cardOne, cardTwo;
let disabledDeck = false;
let modalShown = false
let isFirstClick = true;
let timer

let flipCard = (e) => { // Function to flip a card when clicked
  let elPressed = e.target; // Get the element that was clicked
  let clickedCard = elPressed.parentElement.parentElement; // getting the card, which is the grandparent to the element
  
  // Check if the clicked card is not the same as the previously clicked card and the deck is not disabled
  if (clickedCard !== cardOne && !disabledDeck) {
    clickedCard.classList.add('flip'); // Add the 'flip' class to the card element, check css to see the flip css
    
    if (!cardOne) { // Check if this is the first card clicked
      cardOne = clickedCard;
      if (isFirstClick) { // Check if this is the first click overall
        isFirstClick = false;
        initTimer(30); // Start the timer
      }
      return;
    }
    
    cardTwo = clickedCard;
    disabledDeck = true; // Disable the deck temporarily
    let cardOneItem = cardOne.querySelector('.back-view');
    let cardTwoItem = cardTwo.querySelector('.back-view');
    
    // If either card is missing the 'back-view' class, return without doing anything
    if (!cardOneItem || !cardTwoItem) {
      return;
    }
    
    // Get the ID of the items on the two cards
    cardOneItem = cardOneItem.id;
    cardTwoItem = cardTwoItem.id;
    
    matchCards(cardOneItem, cardTwoItem); // Call the 'matchCards' function to check if the two cards match
  }
};

// Resetting the time 
let resetTimer = () => {
  clearInterval(timer);
  initTimer(30);
}


let matchCards = (item1, item2) => {
    flips++// for each match the flips count increments
    flipsText.innerText = flips 
    if(item1 == item2){
        matchedCard++
        if(matchedCard == 6){
            appearFinishModal(true, 'ITMemory')// the winning game modal
            modalShown = true
            shuffledCard()
            resetTimer()
        }
        cardOne.removeEventListener('click', flipCard)
        cardTwo.removeEventListener('click', flipCard)
        cardOne = cardTwo = ""
        return disabledDeck = false;
    }
   setTimeout(() => {
    cardOne.classList.add('shake')// check keyframes for referrence
    cardTwo.classList.add('shake')
   }, 500)

   setTimeout(() => {
    cardOne.classList.remove('shake', 'flip')
    cardTwo.classList.remove('shake', 'flip')
    cardOne = cardTwo = "" // empty the cards
    disabledDeck = false;
   }, 1200)

}
const initTimer = (maxTime) => {
    timer = setInterval(() => {
        if(maxTime > 0){
          // the timer tics down from max time to right before 0
            maxTime--
            return timerText.innerText = `${maxTime}s`
        } 
        if(!modalShown){
          appearFinishModal(false, 'ITMemory')
        }
        shuffledCard()
        resetTimer()
    }, 1000)
}
// Closing everything and emptying the every variable relevant
let shuffledCard = () => {
    matchedCard = 0
    flips = 0
    flipsText.innerHTML = flips
    cardOne = cardTwo = ""
    cards.forEach(card => {
        card.classList.remove('flip')
        card.addEventListener('click', flipCard);
    });

}
// flipcard function is invoked for each click on each card
cards.forEach(card => {
    card.addEventListener('click', flipCard);
});


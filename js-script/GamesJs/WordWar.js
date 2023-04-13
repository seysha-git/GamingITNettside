let userNameInput = document.querySelector('#userNameInput')
let avatars = document.querySelectorAll('.avatarIcon')
let signIn = document.querySelector('.signIn')
let profileUsername = document.querySelector('#userName')
let profileUserIcon = document.querySelector('#userIcon')
let profileUserPoints = document.querySelector('#userPoints')


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
  }
  
  window.addEventListener('load', getUser);
  getUserAvatar();
  signIn.addEventListener('click', getUserInput);


// List of words and hints with and IT theme.
const words = [
  {
  word: 'byte',
  hint: 'Den grunnleggende enheten for digital informasjon.'
  },
  {
  word: 'cache',
  hint: 'En maskinvare- eller programvarekomponent som lagrer data for rask tilgang.'
  },
  {
  word: 'cloud',
  hint: 'Et nettverk av eksterne servere som lagrer, administrerer og behandler data.'
  },
  {
  word: 'debug',
  hint: 'Prosessen med å finne og fikse feil eller feil i kode.'
  },
  {
  word: 'ethernet',
  hint: 'En kablet nettverksteknologi som vanligvis brukes for lokale nettverk (LAN).'
  },
  {
  word: 'firewall',
  hint: 'Et sikkerhetssystem som overvåker og kontrollerer innkommende og utgående nettverkstrafikk.'
  },
  {
  word: 'hack',
  hint: 'Uautorisert tilgang til eller manipulering av datasystemer eller data.'
  },
  {
  word: 'java',
  hint: 'Et populært objektorientert programmeringsspråk.'
  },
  {
  word: 'kernel',
  hint: 'Kjernen til et operativsystem som administrerer systemressurser og maskinvare.'
  },
  {
  word: 'linux',
  hint: 'Et gratis og åpen kildekode-operativsystem basert på Unix-operativsystemet.'
  },
  {
  word: 'malware',
  hint: 'Ondartet programvare designet for å skade eller forstyrre datasystemer.'
  },
  {
  word: 'nettverk',
  hint: 'En gruppe sammenkoblede datamaskiner eller enheter.'
  },
  {
  word: 'router',
  hint: 'En enhet som videresender datapakker mellom datanettverk.'
  },
  {
  word: 'skript',
  hint: 'En serie med kommandoer eller instruksjoner som utføres av et dataprogram.'
  },
  {
  word: 'server',
  hint: 'En datamaskin eller enhet som gir tjenester eller ressurser til andre datamaskiner eller enheter i et nettverk.'
  },
  {
  word: 'kildekode',
  hint: 'Den opprinnelige menneskelesbare versjonen av et dataprogram.'
  },
  {
  word: 'terminal',
  hint: 'En tekstbasert grensesnitt som brukes til å kommunisere med et datasystem.'
  },
  {
  word: 'virtuell',
  hint: 'Simulert av programvare eller maskinvare i stedet for å være fysisk til stede.'
  },
  {
  word: 'wifi',
  hint: 'En trådløs nettverksteknologi som bruker radiobølger for å gi høyhastighets internett- og nettverkstilkoblinger.'
  },
  {
  word: 'xml',
  hint: 'Et markeringsspråk som brukes til å lagre og transportere data mellom ulike systemer og applikasjoner.'
  }
  ];
    
  

const wordText = document.querySelector("#word")
const hintText = document.querySelector(".hint span")
const scoreText = document.querySelector(".score span")
const timerText = document.querySelector("#time")
const inputField = document.querySelector("input")
const refreshBtn = document.querySelector(".refresh-word")
const checkBtn = document.querySelector('.check-word')

let correctWord, timer;
let score = 0

const initTimer = (maxTime) => {
    timer = setInterval(() => {
        if(maxTime > 0){
          // the timer tics down from max time to right before 0
            maxTime--
            return timerText.innerText = maxTime
        }
        // When its 0, you get the correct answer and the timer and function refreshes
        clearInterval(timer);
        alert(`${correctWord.toUpperCase()} was the correct answer`)
        initGame()
    }, 1000)
}

const resetTimer = (maxTime) => {
  // The default interval and timer
    clearInterval(timer);
    initTimer(maxTime);
}

const initGame = () => {
    resetTimer(30)
    // Takes a random object with a word and a hit
    let randomObj = words[Math.floor(Math.random() * words.length)]
    // Retrieves the word and invokes a split method to remove (,)
    let wordArray = randomObj.word.split("");
    for(let i = wordArray.length-1; i >0; i--){
        // J represents a random letters in the word
        let j = Math.floor(Math.random() * (i+1));
        //  Each letter in the word is switched up with J and vice versa, to randomize it.
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]]
    }
    // The new tossed up word is shown on the page.
    wordText.innerText = wordArray.join("")
    hintText.innerText = randomObj.hint;
    // The correct word is put to lowercase
    correctWord = randomObj.word.toLocaleLowerCase()
    // correct word console.log(wordArray, randomObj.word)
}

initGame()

const checkWord = () => {
  // typed in word is put to lowercase
    let userWord = inputField.value.toLocaleLowerCase();
    if(!userWord){
      // if its not valid
        alert('please enter a word')
    }
    if(userWord !== correctWord){
      // if it does not match the correct word
        return alert(`${userWord} is not correct. Try again`)
    }else{
        // If correct, the below takes place
        score++
        scoreText.innerHTML = score
        inputField.value = ``
        initGame()
        // If score is 5, the game is then finished and modal apears and score and game is refreshed. 
        if(score == 5){
            appearFinishModal(true, 'Scrabbble')
            score = 0
            scoreText.innerHTML = score
            resetTimer(31);
        }
    }
   
}

refreshBtn.addEventListener('click', () => {
    // when pressed, the timer refreshed and game refresh
    resetTimer(31);
    initGame();
});

checkBtn.addEventListener('click', () => {
    // when pressed, the timer refreshed and the word is checked
    resetTimer(31);
    checkWord();
});





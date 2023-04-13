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

// Here is the javascript powering the quiz
const questions = [
    {
        img : '../../Images/Games/QuizImages/Img1.png',
        answers: [
            {text: '4', correct: false },
            {text: '3', correct: false },
            {text: '5', correct: false },
            {text: '7', correct: true },

        ]
    },
    {
        img : '../../Images/Games/QuizImages/Img2.png',
        answers: [
            {text: 'Hello, john !', correct: true },
            {text: 'Yo john!', correct: false},
            {text: 'HelloJohn!', correct: false },
            {text: 'Hello John!', correct: false},

        ]
    },
    {
        img : '../../Images/Games/QuizImages/Img3.png',
        answers: [
            {text: '.. less or equal to 5', correct: false },
            {text: '7', correct: false },
            {text: '5', correct: false},
            {text: '.. greater than 5', correct: true},

        ]
    },
    {
        img : '../../Images/Games/QuizImages/Img4.png',
        answers: [
            {text: '1,2,3,4,5', correct: false},
            {text: '14', correct: false },
            {text: '15', correct: true},
            {text: '5', correct: false },

        ]
    },
    {
        img : '../../Images/Games/QuizImages/Img5.png',
        answers: [
            {text: 'hello', correct: false },
            {text: 'olleh', correct: true },
            {text: 'olleho', correct: false},
            {text: 'h', correct: false },

        ]
    },
    {
        img : '../../Images/Games/QuizImages/Img6.png',
        answers: [
            {text: '25', correct: true },
            {text: '14', correct: false },
            {text: '15', correct: false},
            {text: '5', correct: false},

        ]
    },
    {
        img : '../../Images/Games/QuizImages/Img7.png',
        answers: [
            {text: '1', correct: false },
            {text: '8', correct: false },
            {text: '3', correct: false },
            {text: '5', correct: true },

        ]
    },
    {
        img : '../../Images/Games/QuizImages/Img8.png',
        answers: [
            {text: 'Hello, my name is John!', correct: true },
            {text: 'Hello, my name is 30', correct: false },
            {text: 'My name is John', correct: false },
            {text: 'Yo i am john', correct: false },

        ]
    }
   
]

const questionElement = document.querySelector('#questionImg')
const answerButtons = document.querySelector('.answer-buttons')
const nxtBtn = document.querySelector('.nxtBtn')
const questionNumber = document.querySelector('#questionNumber')



let currentQuestionIndex = 0;
let score = 0;

let startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nxtBtn.innerHTML = "Neste"
    showQuestion() // ShowQuestion is invoked
    // Debugging purposes console.log('hello')
}

let showQuestion = () => {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    // The question list start at 0, so the questionNumber is increased by 1
    let questionNo = currentQuestionIndex + 1
    questionNumber.innerHTML = questionNo
    questionElement.src = currentQuestion.img

    currentQuestion.answers.forEach(answer => {
        // For each anser in the current question
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add('answerBtn')
        answerButtons.appendChild(button)
        // Represent the correct answer in the answer object
        if(answer.correct){
            // Stores the correct answer
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })
    // On the last question, the innerHTML is changed
    if(currentQuestionIndex == 7){
        nxtBtn.innerHTML = `Fullfør`
    }
}

let resetState = () => {
    nxtBtn.style.display = "none"
    // Removes all answer buttons if exist
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

let selectAnswer = (e) => {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        // Green color btn
        selectedBtn.classList.add('correct');
        score++
    }else{
        // Red color btn
        selectedBtn.classList.add('incorrect')
    }
    // Displays the correct button, even if you press incorrect
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct')
        }
        button.disabled = true
    });
    nxtBtn.style.display = "block"
}
let showScore = () => {
    resetState()
     appearFinishModal(true, 'javascript')// Modal appears
}
let handleNextButton = () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        // If its the last question, the function is invoked
        showScore()
    }
}
nxtBtn.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})
startQuiz()

console.log('hello')



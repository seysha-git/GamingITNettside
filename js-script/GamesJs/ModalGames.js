const main = document.querySelector('main')
const header = document.querySelector('header')
const footer = document.querySelector('footer')
const gameIntro = document.querySelector('#startModal')
const gameFinish = document.querySelector('#finishModal')
const signInBtn = document.querySelector('.signIn')
const modalExit = document.querySelector('#modalExit')
const Again = document.querySelector('#Again')
const finishTitle = document.querySelector('#finishTitle')
const finishP = document.querySelector('#finishPara')
const settingIcon = document.querySelector('#settingI')
const settingModal = document.querySelector('#settingModal')
const settingExit = document.querySelector('.exitSetting')

// Displays gameIntro Modal after 0.5s
let appearIntroModal = () => {
    gameIntro.classList.add('modalAppear')
}
setTimeout(appearIntroModal, 500)
// removes introModal on the exitBtn or on the start btn
let removeIntroModal = () => {
    signInBtn.addEventListener('click', () => {
    gameIntro.classList.remove('modalAppear')
    main.classList.remove('blurBackground')
    header.classList.remove('blurBackground')
    footer.classList.remove('blurBackground')
    initGame()
    })
    modalExit.addEventListener('click', () => {
        gameIntro.classList.remove('modalAppear')
        main.classList.remove('blurBackground')
        header.classList.remove('blurBackground')
        footer.classList.remove('blurBackground')
    })
}
removeIntroModal()


let appearFinishModal = (state, game) => {
    // State = true, you won, you get positiv text and points
    // Game parameter is a string where the game name is written in
    if(state){
        finishTitle.innerHTML = `Gratulerer!!`
        finishP.innerHTML = `Yayyy, du vant! Gratulerer! Du var veldig gode i spille, ${game}. Men prøv igjen da ! Kanskje du ikke er like heldig:) Trykk igjen for å spille igjen`
        let collectedPoints = parseInt(sessionStorage.getItem('profilePoints')) || 0;
        collectedPoints += 200;
        // You get more points depending on the games
        if(game == 'Scrabbble'){
            collectedPoints += 150;
        }
       
        if(game == 'ITMemory'){
            collectedPoints += 300;
        }
        // The points are recieved and set on the profilePoints item
        sessionStorage.setItem('profilePoints', collectedPoints);
        profileUserPoints.innerHTML = `| ${collectedPoints} pts`;
        if(game == 'javascript'){
            // If you get more than 6 points in the quiz, you get your points
            finishTitle.innerHTML = `Gratulerer!!`
            if(score < 6){
                finishP.innerHTML = `Ah nei, det viser seg at du mangler poeng. You hadde ${score} av ${questions.length}. Men ikke stopp å prøve igjen. Gjør ditt beste. Kanskje neste gang klarer du å vinne:)`
                
            }
            if(score >=6){
                finishP.innerHTML = `Ja, du klarte det! Du er uten tvil en Javascript-proff. Du scoret ${score} av ${questions.length}. Kan du forbedre deg enda mer? Eller var det bare flaks:)`
                profileUserPoints.innerHTML = `| ${collectedPoints} pts`
            }
            if(score == 8){
                finishP.innerHTML = `Ja, du klarte det! Du er uten tvil en Javascript-proff. Du scoret ${score} av ${questions.length}. Du er den beste! Men prøv igjen. Var det bare flaks:)`
            }
            
        }
    }else{
        // If you lost you get a sad text
        finishTitle.innerHTML = `Bedre lykke neste gang! `
        finishP.innerHTML = `Ikke la deg ned av tapet ditt. Husk at hver feil er en mulighet til å lære. Fortsett å prøve, du klarer dette! Kom igjen!`
    }
    // Effects for the modal to appear
    gameFinish.classList.add('modalAppear')
    main.classList.add('blurBackground')
    header.classList.add('blurBackground')
    footer.classList.add('blurBackground')
}


let removeFinishModal = () => {
    // If you press again, you get a new game
    Again.addEventListener('click', () => {
        gameFinish.classList.remove('modalAppear')
        main.classList.remove('blurBackground')
        header.classList.remove('blurBackground')
        footer.classList.remove('blurBackground')
        resetState()
        startQuiz()
        shuffledCard()
        resetTimer()
    })
}

removeFinishModal()

let appearSettingModal = () => {
    // Efffects for modal to appear
    settingModal.classList.add('modalAppear')
    main.classList.toggle('blurBackground')
    header.classList.toggle('blurBackground')
    footer.classList.toggle('blurBackground')
}

let removeSettingModal = () => {
    // Efffects for modal to disappear
    settingModal.classList.remove('modalAppear')
    main.classList.toggle('blurBackground')
    header.classList.toggle('blurBackground')
    footer.classList.toggle('blurBackground')
}
settingIcon.addEventListener('click', appearSettingModal)
settingExit.addEventListener('click', removeSettingModal)


const signOut = document.querySelector('#signOut')
// if you press signOut, the session sotrage is cleared
let logOut = () => {
    sessionStorage.clear()
}

signOut.addEventListener('click', logOut)


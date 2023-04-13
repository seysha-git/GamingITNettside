const rightScroll = document.querySelector('#right')
const leftScroll = document.querySelector('#left')
const selectionContainer = document.querySelector('.selectionGames')
const modalFront = document.querySelector('.modalFigure')
const main = document.querySelector('main')
const header = document.querySelector('header')
const footer = document.querySelector('footer')
const signInBtn = document.querySelector('.signIn')
const modalExit = document.querySelector('#modalExit')
const userIcon = document.querySelector('#userIcon')
const settingIcon = document.querySelector('#settingI')
const navMenu = document.querySelector('.navMenu')
const exitIcon = document.querySelector('#exitIcon')
const body = document.querySelector('body')
const settingModal = document.querySelector('#settingModal')
const settingExit = document.querySelector('.exitSetting')
const homeOptions = document.querySelector('.homeOption h2')
const signOut = document.querySelector('#signOut')


// Games scroll buttons controllers
let scrollMenu = () => {
    rightScroll.addEventListener('click', () => {
        selectionContainer.scrollLeft += 300
    })
    leftScroll.addEventListener('click', () => {
        selectionContainer.scrollLeft -= 300
    })
}

scrollMenu()

// The effect that displays and removes the modals, both logIn modals and settngs modals as you can see
let appearlogInModal = () => {
    modalFront.classList.toggle('modalAppear')
    main.classList.toggle('blurBackground')
    header.classList.toggle('blurBackground')
    footer.classList.toggle('blurBackground')
}
let removeModal = () => {
    signInBtn.addEventListener('click', () => {
        modalFront.classList.remove('modalAppear')
        main.classList.remove('blurBackground')
    header.classList.remove('blurBackground')
    footer.classList.remove('blurBackground')
    })
    modalExit.addEventListener('click', () => {
        modalFront.classList.remove('modalAppear')
        main.classList.remove('blurBackground')
        header.classList.remove('blurBackground')
        footer.classList.remove('blurBackground')
    })
}
removeModal()

userIcon.addEventListener('click', appearlogInModal)

let appearSettingModal = () => {
    settingModal.classList.add('modalAppear')
    main.classList.add('blurBackground')
    header.classList.add('blurBackground')
    footer.classList.add('blurBackground')
}

let removeSettingModal = () => {
    settingModal.classList.remove('modalAppear')
    main.classList.remove('blurBackground')
    header.classList.remove('blurBackground')
    footer.classList.remove('blurBackground')
}
settingIcon.addEventListener('click', appearSettingModal)
settingExit.addEventListener('click', removeSettingModal)

// Here is the sign out effect on the sign out option in the setting menu.
// Here i am then clearing the session storage which is one of the places in which the user is stored

let logOut = () => {
    sessionStorage.clear()
}

signOut.addEventListener('click', logOut)
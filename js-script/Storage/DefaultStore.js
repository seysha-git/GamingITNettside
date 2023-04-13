let userNameInput = document.querySelector('#userNameInput')
let avatars = document.querySelectorAll('.avatarIcon')
let signIn = document.querySelector('.signIn')
let profileUsername = document.querySelector('#userName')
let profileUserIcon = document.querySelector('#userIcon')
let profileUserPoints = document.querySelector('#userPoints')
let userLike = document.querySelectorAll('.gameRating i')
let userRatings = document.querySelector('#gameRating')
let leaderboardRanking = document.querySelector('.leaderboardRanking')

// In this file I have the javacsript behind the sign in modal where I retrieve the users username and avatar.


let getUserInput = () => {
    let nameInput = userNameInput.value;
    profileUsername.innerHTML = nameInput;
    
    // Here i am retrieving previously saved points from sessionStorage
    let points = parseInt(sessionStorage.getItem('profilePoints')) || 0;
    profileUserPoints.innerHTML = `| ${points} pts`;
    // Here I set the name and points to their spesific sessionstorage item
    sessionStorage.setItem('profileUserName', nameInput);
    sessionStorage.setItem('profilePoints', points);
    

  } 


let getUserAvatar = () => {
    avatars.forEach(avatar => {
      avatar.addEventListener('click', () => {
        // This refers to the avatarIcons container id.
        let selectedAvatar = avatar.parentElement.id;
        // Here I am only displaying the activeAvatar class for the clicked avatarIcon
        avatars.forEach(avatar => avatar.classList.remove('activeAvatar'));
        avatar.classList.add('activeAvatar');
        // Here I display it in the top corner depending on the chosen avatarIcon
        if(selectedAvatar == 'avatarGif') {
          profileUserIcon.innerHTML = `<img src="./Images/Avatars/avatarGif.png" height="45px" width="45px" class="avatarIcon" />`;
        } else if(selectedAvatar == 'avatarElf') {
          profileUserIcon.innerHTML = `<img src="./Images/Avatars/avatarElf.png" height="45px" width="45px" class="avatarIcon" />`;
        } else {
          profileUserIcon.innerHTML = `<img src="./Images/Avatars/avatarDog.png" height="45px" width="45px" class="avatarIcon" />`;
        }
        //Here I set the selectedAvatar to the menntioned item in the sessionStroage, i grønn.
        sessionStorage.setItem('selectedAvatar', selectedAvatar);
      });
    });
  }
  
  let getUser = () => {
    // if there is no name or point from the sessionStorage, then an empty string and 0 returns
    const savedName = sessionStorage.getItem('profileUserName') || '';
    const savedPoints = parseInt(sessionStorage.getItem('profilePoints')) || 0;
    //If its not an empty string
    if (savedName) {
      profileUsername.innerHTML = savedName;
      profileUserPoints.innerHTML = `| ${savedPoints} pts`;
    }
    // Here I get the selectedAvatar from previous function
    const savedAvatar = sessionStorage.getItem('selectedAvatar');
    if (savedAvatar) {
      if (savedAvatar == 'avatarGif') {
        profileUserIcon.innerHTML = `<img src="./Images/Avatars/avatarGif.png" height="45px" width="45px" class="avatarIcon" />`;
      } else if (savedAvatar == 'avatarElf') {
        profileUserIcon.innerHTML = `<img src="./Images/Avatars/avatarElf.png" height="45px" width="45px" class="avatarIcon" />`;
      } else {
        profileUserIcon.innerHTML = `<img src="./Images/Avatars/avatarDog.png" height="45px" width="45px" class="avatarIcon" />`;
      }
    }
  }
  // This eventListener does so that when you refresh the browser, the information is always updated.
  window.addEventListener('load', getUser);
  getUserAvatar();

  //This powers the performance part
  let leaderBoard = () => {
    // Here I get the users from the LocaStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    // Here i retrieve the savedInfo from the sessionStorage
    const savedName = sessionStorage.getItem('profileUserName') || '';
    const savedPoints = parseInt(sessionStorage.getItem('profilePoints')) || 0;
    const savedAvatar = sessionStorage.getItem('selectedAvatar') || '';
    //console.log(savedAvatar) For debugging purposes
    // Only users that have a name in the user list that is equal to the savedName
    const existingUserIndex = users.findIndex(user => user.name === savedName);
    // If it is a already saved user, it will not be at the bottom(-1). 
    if (existingUserIndex !== -1) {
      // Therefore we only want to update the users point and avatar if there are changes
      users[existingUserIndex].points = savedPoints;
      users[existingUserIndex].avatar = savedAvatar;
    } else {
      // If its a newUser, then I want to make an newUser object with the name, points and avatar
      const newUser = { name: savedName, points: savedPoints, avatar: savedAvatar };
      users.push(newUser);
    }
    // Only users with a name and they or sorted after highest points
    users = users.filter((user) => user.name)
    users.sort((a, b) => b.points - a.points);
    
    localStorage.setItem('users', JSON.stringify(users));
    
    //Debuging purpose console.log(users);
    //For each user in the list with their index, I print in the leaderboard.
    users.forEach((user, index) => {
      // The index + 1 is the current position in list + 1.
      leaderboardRanking.innerHTML += `
      <div class="player">
        <div class="playerInfo">
          <h3>${index + 1}</h3>
          <img src="./Images/Avatars/${user.avatar}.png" height="30px" width="30px" class="avatarIcon" />
          <h3>${user.name}</h3>
        </div>
        <div class="playerPoints">
          <h3>${user.points} pts</h3>
        </div>
      </div>
      `
    })
  }
  
  leaderBoard()
  
  signIn.addEventListener('click', getUserInput);






 
 

  
  
  




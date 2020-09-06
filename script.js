// application cdn's for the firebase constants.
// var FIREBASE_APP = document.createElement('script').setAttribute('src','https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
// var FIREBASE_ANALYTICS = document.createElement('script').setAttribute('src','https://www.gstatic.com/firebasejs/7.18.0/firebase-analytics.js');
// var FIREBASE_AUTH = document.createElement('script').setAttribute('src','https://www.gstatic.com/firebasejs/7.17.2/firebase-auth.js');

// document.head.appendChild(FIREBASE_APP);
// document.head.appendChild(FIREBASE_ANALYTICS);
// document.head.appendChild(FIREBASE_AUTH);

// application constants or html elements
const SignInMAIL=document.getElementById('signinEmail');
const SigninPass=document.getElementById('signinPassword');
const SignUpMAIL=document.getElementById('SignUpMail');
const SignUpPass=document.getElementById('SignUpPass');
const SignUpCPass=document.getElementById('SignUpCPass');
const SignUpName=document.getElementById('SignUpName');
const SigninBT=document.getElementById('SignInBt');
const SignUpBt=document.getElementById('SignUpBt');

// SIGNIN WITH GOOGLE SIGNIN BUTTON
var firebaseConfig = {
  apiKey: "AIzaSyDM0TSI3G hUQ9gyix_krjTLrXbEJdAFZe4",
  authDomain: "utube-79726.firebaseapp.com",
  databaseURL: "https://utube-79726.firebaseio.com",
  projectId: "utube-79726",
  storageBucket: "utube-79726.appspot.com",
  messagingSenderId: "628525681297",
  appId: "1:62852568s1297:web:b343758cbe1a6cb53d4d30",
  measurementId: "G-GK6JKD96B7"
};

var FIREBASE_AUTH_USER;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

googleIn=()=>{
  base_provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(base_provider).then(function(result){
    console.log(result)
    console.log("Success")
  }).catch(function(err){
    console.log(err)
    console.log("failed")
  })  
}


// firebase login.
function login(){
  function newLoginHappened(user){
    if(user){
      FIREBASE_AUTH_USER = user;
      app(user);
    }else{
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }	 
  }
  firebase.auth().onAuthStateChanged(newLoginHappened);
}

// SIGNIN WITH FORM
// firebase.auth().onAuthStateChanged((user) => {
//     if(user) {
//       window.location.href="home.html"
//     }
// });

function app(user){
  // YOURCODE FOR APP CONF
  document.getElementById("clientName").innerHTML = user.displayName;
  window.location.href = "home.html";
}


function UserExistInSession() {
  // please pre check this condition
  if (FIREBASE_AUTH_USER) {
    window.location.href = "home.html";
  } else {
    // window.location.href = "index.html";
  }
}


// firebase signout.
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    window.location.href = "index.html";
  });
}

window.onload = UserExistInSession;

// Direct Html element behaviours 
document.querySelector('.img-btn').addEventListener('click', function() {
  document.querySelector('.cont').classList.toggle('s-signup')
});

SigninBT.addEventListener('click', (e)=> {
  if( SignInMAIL.value !="" && SigninPass.value != "" ){
    var result=firebase.auth().signInWithEmailAndPassword(SignInMAIL.value,SigninPass.value);
    result.catch(function(error) {
      var errorCode=error.code;
      var errorMessage=error.message;
      console.log(errorCode);
      console.log(errorMessage);
      window.alert("Message : "+errorMessage)
    });
  }
  else{
    window.alert("Please fill out all fields")
  }
});

SignUpBt.addEventListener('click',(e)=>{
  if( SignUpMAIL.value !="" && SignUpPass.value != "" && SignUpName !="" && SignUpCPass !=""){
      var result=firebase.auth().createUserWithEmailAndPassword(SignUpMAIL.value,SignUpPass.value);
      result.catch(function(error) {
        var errorCode=error.code;
        var errorMessage=error.message;
        console.log(errorCode);
        console.log(errorMessage);
        window.alert("Message : "+errorMessage)
      });
  }else{
    window.alert("Please fill out all fields");
  }
});
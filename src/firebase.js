
import firebase from 'firebase';


var firebaseApp =firebase.initializeApp(
{
    apiKey: "AIzaSyAt2tKIsw0QbQSBVTssBHMLRY8zS-3tPS4",
    authDomain: "musicman-7b399.firebaseapp.com",
    projectId: "musicman-7b399",
    storageBucket: "musicman-7b399.appspot.com",
    messagingSenderId: "269741248581",
    appId: "1:269741248581:web:341bbb2c48804d033e532c",
    measurementId: "G-J15MTVJ20N"
  }

) ;



const db= firebaseApp.firestore();
const auth= firebase.auth();
const storage= firebase.storage();
export  {db,auth,storage};

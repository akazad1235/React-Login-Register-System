import React, { useState } from 'react';

import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

function App() {

  const [users, setUser] = useState({
    isSignIn:false,
    name:'',
    email:'',
    photo:''
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = ()=> {
    firebase.auth().signInWithPopup(provider)
    .then(result =>{
      var token = result.credential.accessToken;
         // The signed-in user info.
    // var user = result.user;
        const {displayName, photoURL, email} = result.user
        const signIn = {
          isSignIn:true,
          name: displayName,
          email: email,
          photo: photoURL
        }
      setUser(signIn)
      console.log(displayName, photoURL, email);
    //  console.log(user);
    }).catch(err=>{
      console.log(err);
    })
  } 

  const handleSignOut =()=> {
    firebase.auth().signOut()
    .then(result => {
      const userSignOut ={
        isSignIn:false,
        name:'',
        email:'',
        photo:''
      }
      setUser(userSignOut)
    }).catch(err => {
      return err;
    })
  }
  
  return (
    <div className='App'>
      {
        users.isSignIn ? <button onClick={handleSignOut}> LogOut</button>:<button onClick={handleSignIn}> Sign In </button>
      }
      {
        users.isSignIn &&
        <div>
         <h1>name:{users.name}</h1>
        <p>email:{users.email}</p>
        <img style={{width:'50%'}} src={users.photo}/>
      </div>
      }
      <form action="">
        <input type="email" name="email" placeholder=""/>
        <input type="password" name="password" id=""/>
      </form>
    </div>
  );
}

export default App;

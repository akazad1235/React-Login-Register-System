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
  //loign input section 
  const handlBlur = (event)=> {
  // const isValidated = (event.target.name, event.target.value);

    let isvalidForm = true;
    if (event.target.name == 'email') {
        isvalidForm = /\S+@\S+\.\S+/.test(event.target.value);
       // console.log(isvalidForm); 
    }
    if (event.target.name == 'password') {
        const isValidPassword = event.target.value.length>6;
        const passwordHasNumber = /\d{1}/.test(event.target.value);
        isvalidForm = (isValidPassword && passwordHasNumber);
    }
    console.log(isvalidForm);

  }
  const handlerSubmit = (event)=>{
    console.log( 'login clicked', event);
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
      <h3>Owner Login</h3>
      <form onSubmit={handlerSubmit}>
        <input type="email" name="email" onBlur={handlBlur} placeholder="Please Enter Your Email" required/><br/>
        <input type="password" name="password" onBlur={handlBlur} placeholder="Please Enter Your Password" required/><br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;

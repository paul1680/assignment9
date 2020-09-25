import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import './Login.css';
import { Link } from 'react-router-dom';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
    

const Login = () => {


    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
      isSignedIn: false,
      displayName: '',
      email: '',
      password: '',
      photo: ''
    });
    const handleLogClick =()=>{
        const newLogin = document.getElementById('newLogin');
        const loginBtn = document.getElementById('loginBtn');
        const signinBtn = document.getElementById('signinBtn');
        newLogin.style.display = 'none';
        signinBtn.style.display = 'block';
        loginBtn.style.display = 'none';
        setNewUser(!newUser);
    }


    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const handleGoogledClick = ()=>{
        if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            const {displayName, email} = result.user;
            const newUser = {displayName: displayName, email: email}
            setLoggedUser(newUser)
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    };

    const handleFbClick = () =>{
              
        if (firebase.apps.length === 0) {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
        }

        //Facebook sign-in provider
        const fbProvider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(fbProvider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            const {displayName, email} = result.user;
            const newUser = {displayName: displayName, email: email}
            setLoggedUser(newUser)
            
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    };
    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
          const isPasswordValid = e.target.value.length > 6;
          const passwordHasNumber =  /\d{1}/.test(e.target.value);
          isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(isFieldValid){
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo);
        }
      }
      const handleSubmit = (e) => {
        firebase.initializeApp(firebaseConfig);
        if(newUser && user.email && user.password){
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then( res => {
            const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            updateUserName(user.name);
            console.log('sign in user info', res.user);
          })
          .catch( error => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
          });
        }
    
        if(!newUser && user.email && user.password){
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(res => {
            const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedUser(newUserInfo);
            console.log('sign in user info', res.user);
          })
          .catch(function(error) {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
          });
        }
    
        e.preventDefault();
      }
      const updateUserName = name =>{
        firebase.initializeApp(firebaseConfig);
        const user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name
        }).then(function() {
          console.log('user name updated successfully')
        }).catch(function(error) {
          console.log(error)
        });
      }
    

    return (
        <div className ='loginPage'>
             <div className="loginForm rounded mt-5">
        
             <form onSubmit={handleSubmit}>
             <div className='form-group'> 
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" class="form-control bg-light" required/></div> 
        <div className="form-group">
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" class="form-control bg-light" required/></div>
        <br/>

    <button type="submit" id="loginBtn" className="btn btn-warning col-md-12">Login</button>
    <button type="submit" id="signinBtn" className="btn btn-warning col-md-12">Sign-up</button></form>

    <div className="form-group">
        <div id='newLogin'>
        <p className="text-center">New User?
        <br/> <p className="text-danger" onClick={() =>handleLogClick()}>Create new account</p></p>
        </div>
    </div>
    <br/>

    <p className="text-center text-success">Or</p>

<div className="">
    <button onClick={handleFbClick} className="btn btn-outline-primary col-md-12">Facebook Sign Up</button>
    <br />
    <br />
    <button onClick={handleGoogledClick} className="btn btn-outline-danger col-md-12">Google Sign Up</button>
    <br/>
    <br/>
    <Link to="/home">
            
            <button className="btn btn-secondary col-md-12" href="">Home</button>
    </Link>
    <p style={{color: 'red'}}>{user.error}</p>
      { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}
</div>
</div>

        </div>
    );
};

export default Login;
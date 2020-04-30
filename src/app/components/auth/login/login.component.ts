import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import * as firebase from 'firebase';
import { userInfo } from 'os';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  item : any = {
    email : '',
    contra : ''
  }
  constructor(
    private router: Router,
    private authService : AuthService,
    ) { }

  ngOnInit(): void {
  }

  /* Otra opcion de ruteo */
  navRegister(){
    this.router.navigate(['register']);
  };

  ingresar(){
    firebase.auth().signInWithEmailAndPassword(this.item.email, this.item.contra)
    .then((res)=>{
      console.log(res);
      var user = firebase.auth().currentUser;
      if (user != null) {
        user.providerData.forEach((profile) => {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
          if(!user.emailVerified){
            user.sendEmailVerification()
            .then(function() {
              console.log('enviando correo');
              console.log(user);
            // Email sent.
            }).catch(function(error) {
              // An error happened.
              console.log(error);
            });
      
          }else{
            console.log('El usuario ya verifico su correo');
          }
        });

        //this.verificarUser();
      }
    })
    .catch(function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // ...
    });
  }

  verificarUser(){
    var user = firebase.auth().currentUser;
    if(user.emailVerified == false){
      user.sendEmailVerification().then(function() {
        console.log('enviando correo');
      // Email sent.
      }).catch(function(error) {
        // An error happened.
        //console.log(error);
      });
    }else{
      console.log('El usuario ya verifico su correo');
    }
  }

  loginWithGoogle(){
    this.authService.googleSignin().then(res=>{
      let data : any = res.credential;
      localStorage.setItem("mapneticCredential",data.idToken);
      console.log(res,data.idToken);
    },
    err=>{
      alert("Ha ocurrido un error");
    })
  }

  loginWithFacebook(){
    this.authService.facebookSignin().then(res=>{
      console.log(res);
    },
    err=>{
      alert("Ha ocurrido un error");
    })
  }

  observador();

  observador() {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        
        // ...
      } else {
        console.log('sin usuario');
        // User is signed out.
        // ...
      }
    });

  }  

}

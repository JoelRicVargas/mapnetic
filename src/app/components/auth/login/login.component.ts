import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import * as firebase from 'firebase';
import { userInfo } from 'os';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /* Otra opcion de ruteo */
  navRegister(){
    this.router.navigate(['register']);
  };

  ingresar(){
    firebase.auth().signInWithEmailAndPassword(this.item.email, this.item.contra)
    .then(function(){
      var user = firebase.auth().currentUser;
      if (user != null) {
        user.providerData.forEach(function (profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
          if(user.emailVerified == false){
            user.sendEmailVerification()
            .then(function() {
              console.log('enviando correo');
              console.log(user);
            // Email sent.
            }).catch(function(error) {
              // An error happened.
              //console.log(error);
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
        console.log(user);
      // Email sent.
      }).catch(function(error) {
        // An error happened.
        //console.log(error);
      });
    }else{
      console.log('El usuario ya verifico su correo');
    }
  }

  observador();

  observador() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log(user.emailVerified);
        // ...
      } else {
        console.log('sin usuario');
        // User is signed out.
        // ...
      }
    });

  }  

}

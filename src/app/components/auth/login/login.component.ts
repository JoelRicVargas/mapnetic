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
    .catch(function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // ...
    });
    this.verificarUser();
  }

  cerrar(){

    firebase.auth().signOut()
    .then(function () {
      console.log('saliendo...');
    })
    .catch(function (error) {
      console.log('error...');
    })

  }

  verificarUser(){

    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      console.log('enviando correo');
      console.log(user);
    // Email sent.
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });

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

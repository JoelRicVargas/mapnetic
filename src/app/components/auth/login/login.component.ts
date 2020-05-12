import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/service-auth.service';
import { NgForm } from '@angular/forms';
import { error } from 'protractor';
import { AuthFirebaseService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {
  
  @ViewChild('f') form : NgForm;
  email = null;
  constructor(private router : Router, private authService : AuthService,
    private routerActive : ActivatedRoute,
    private AuthFirebaseService : AuthFirebaseService
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    if(this.routerActive.snapshot.params.email){
      this.AuthFirebaseService.emailIsVerified({email:this.routerActive.snapshot.params.email}).subscribe(res=>{
        console.log(res);
      })
    }
  }

  login(f){
    this.authService.loginUser(f.value.email, f.value.contra);
  }

  loginGoogleUSer() : void{
    
  }
  
  loginFacebookUser() : void{
    this.authService.loginFacebookUser()
    .then((response) => {
      this.router.navigate(['/profile']);
    }).catch(error => {
      console.log(error);
      console.log(error.code);
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
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

  item: any = {
    email: '',
    contra: ''
  }
  code: any = null;
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  /* Otra opcion de ruteo */
  navRegister() {
    this.router.navigate(['register']);
  };

  updateProfile(data) {
    this.authService.updateProfile(data).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  ingresar() {
    firebase.auth().signInWithEmailAndPassword(this.item.email, this.item.contra)
      .then((res) => {
        var user = firebase.auth().currentUser;
        if (user != null) {
          user.providerData.forEach((profile) => {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
            if (!user.emailVerified) {
              // user.sendEmailVerification()
              // .then(function() {
              //   console.log('enviando correo');
              //   console.log(user);
              // // Email sent.
              // }).catch(function(error) {
              //   // An error happened.
              //   console.log(error);
              // });

            } else {
              console.log('El usuario ya verifico su correo');
            }
          });

          //this.verificarUser();
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        //var errorCode = error.code;
        //var errorMessage = error.message;
        // ...
      });
  }

  verificarUser() {
    var user = firebase.auth().currentUser;
    if (user.emailVerified == false) {
      user.sendEmailVerification().then(function () {
        console.log('enviando correo');
        // Email sent.
      }).catch(function (error) {
        // An error happened.
        //console.log(error);
      });
    } else {
      console.log('El usuario ya verifico su correo');
    }
  }

  loginWithGoogle() {
    this.authService.googleSignin().then( async res => {
      let token = await firebase.auth().currentUser.getIdToken();
      this.authService.setTokenToLocalstorage(token);
      if (res.additionalUserInfo.isNewUser) {
        let authenticateData = JSON.parse(JSON.stringify(res.additionalUserInfo.profile));
        let dataUpdate = {
          nombres: authenticateData.given_name,
          apellidos: authenticateData.family_name,
          direccion: '',
          telefono: '',
          referCode: null // El codigo de referencia del usuario
        }
        return this.updateProfile(dataUpdate);
      }
    },
      err => {
        alert("Ha ocurrido un error");
      })
  }

  loginWithFacebook() {
    this.authService.facebookSignin().then(res => {
      if (false) this.refered(this.code);
    },
      err => {
        alert("Ha ocurrido un error");
      })
  }

  observador();

  observador() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
      } else {
        console.log('sin usuario');
        // User is signed out.
        // ...
      }
    });
  }

  refered(code) {
    this.authService.referedBy({ referCode: code }).subscribe(
      res => {
        console.log("Codigo de referencia actualizado");
      },
      err => {
        console.log(err);
      });
  }

}

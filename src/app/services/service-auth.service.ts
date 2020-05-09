import { Injectable, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import * as $ from 'jquery';
import { AuthFirebaseService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private db = firebase.firestore();
  private noError = true;

  constructor(public router: Router,
              private routerActive : ActivatedRoute,
              private authFirebaseService : AuthFirebaseService,
              ) { }

  loginUser(email, contra){
    $("#error").text("");
    firebase.auth().signInWithEmailAndPassword(email , contra)
    .then(async () => {
        var user = firebase.auth().currentUser;
        let token = await user.getIdToken();
        this.authFirebaseService.setTokenToLocalstorage(token);
        if (user != null) {
            user.providerData.forEach(function (profile) {
              console.log("Sign-in provider: " + profile.providerId);
              console.log("  Provider-specific UID: " + profile.uid);
              console.log("  Name: " + profile.displayName);
              console.log("  Email: " + profile.email);
              console.log("  Photo URL: " + profile.photoURL);
            });
            if(user.emailVerified == false){
              $("#error").text("Su correo no fue verificado se enviará un nuevo link de verificación.");
              user.sendEmailVerification()
              .then(() =>  {
                console.log('enviando correo');
                console.log(user);
              }).catch(error => {
                this.authFirebaseService.resendVerificationEmail();
              });
            }else{
              this.authFirebaseService.getAuth();
              this.router.navigate(["/profile"]);
            }
        }else{
          $("#error").text("El email ingresado no existe.");
        }
    })
    .catch( error => {
      var error_msj : String = error.code;
      console.log(error_msj);
      console.log(error);
      switch (error_msj){
        case 'auth/user-not-found' : {
          return $("#error").text("No hay registro del usuario ingresado." +
          "El usuario puede haber sido eliminado.");
        }
        case 'auth/wrong-password' : {
          return $("#error").text("La contraseña no es válida.");
        }
        case 'auth/network-request-failed' :{
          return $("#error").text("Se ha producido un error de red (como tiempo de espera," +
          "conexión interrumpida o no tiene acceso a internet).");
        }
        case 'auth/too-many-requests' :{
          return $("#error").text("Demasiados intentos de inicio de sesión fallidos." +
          "Por favor, inténtelo de nuevo más tarde.");
        }
        default: {
          return $("#error").text("Error de inicio de sesión intente más tarde.");
        }
      }
    })
  }

  registerGoogleUSer(token){
    var resultados : number;
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((result) => {
      var nuevo_user = result.user;
      console.log("User creado " + nuevo_user.displayName);
      console.log("User creado " + nuevo_user.email);
      var nombres = nuevo_user.displayName;
      var correo = nuevo_user.email;
      var contra = nuevo_user.uid;     
      this.db.collection('users').where("correo","==",correo).get().then(snapshot => {
        let total_count = 0;
        snapshot.forEach(doc => {
            total_count += doc.data().count;
        });
        if(total_count == 0){
          //registra
          this.addRegisterUser(nombres,correo,contra,token);
          //cambia la contra
          this.cambiarPass(contra);
          //ingresa
          this.loginUser(correo,contra);
        }
      }); 
      
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  
  registerFacebookUser(token){
    var resultados : number;
    var provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((result) => {
      var nuevo_user = result.user;
      console.log("User creado " + nuevo_user.displayName);
      console.log("User creado " + nuevo_user.email);
      var nombres = nuevo_user.displayName;
      var correo = nuevo_user.email;
      var contra = nuevo_user.uid;     
      this.db.collection('users').where("correo","==",correo).get().then(snapshot => {
        let total_count = 0;
        snapshot.forEach(doc => {
            total_count += doc.data().count;
        });
        if(total_count == 0){
          //registra
          this.addRegisterUser(nombres,correo,contra,token);
          //cambia la contra
          this.cambiarPass(contra);
          //ingresa
          this.loginUser(correo,contra);
        }
      }); 
      
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  loginFacebookUser(){
    var provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(function(result) {
      var user = result.user;
      console.log("User creado " + user);
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  addRegisterUser(displayName,email,pass,token){
    var usuario = this.db.collection("users");
    usuario.add({
      nombres : displayName,
      apellidos : '',
      correo : email,
      contrasena : pass,
      direccion : '',
      telefono : '',

      codigo_ref : token,
      plan_actual : 'Ninguno',
      cantidad_ref : 0,
      dinero_generado : 0.00,
      perfil_aprovado : false,
      foto : '',
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  cambiarPass(contra){
    var user = firebase.auth().currentUser;
    var newPassword = contra;
    user.updatePassword(newPassword).then(function() {
      //se cambio exitosamente
    }).catch(function(error) {
      // An error happened.
    });
  }

  recuperarPassword(password){
    $("#error").text();
    $("#sucess").text();
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(password).then(function() {
      console.log("Enviando correo de reestablecimiento de password...");
      $("#success").text("El correo de reestablecimiento se envio correctamente");
    }).catch(function(error) {
      console.log(error.code);
      console.log(error);
      switch(error.code){
        case 'auth/user-not-found':{
          $("#error").text("El usuario que ingreso no existe, intente nuevamente!.");
        }
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { Router ,ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/service-auth.service';
import { AuthFirebaseService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  db = firebase.firestore();
  private tokenRef = "";

  constructor(private router : Router, 
              private routerActive : ActivatedRoute,
              private authService : AuthService,
              private authFirebaseService : AuthFirebaseService,
              ) { }

  ngOnInit(): void {}

  actualizarReferidos(){
    this.tokenRef = this.routerActive.snapshot.params.token;
    if(this.tokenRef != null){
      if(this.tokenRef.length == 20){
        return true;
      }
    }
    return false;
  }

  insertarRegistro(f){
    var usuario = this.db.collection("users");
    //Primero registra el email si no ocurre un error pasa
    usuario.add({
      nombres : f.nombres,
      apellidos : f.apellidos,
      correo : f.correo,
      contrasena : f.contrasena,
      direccion : '',
      telefono : '',

      codigo_ref : '',
      plan_actual : 'Ninguno',
      cantidad_ref : 0,
      dinero_generado : 0.00,
      perfil_aprovado : false,
      foto : '',
      portada : '',
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

    if(this.actualizarReferidos() != false){
      var userRef = this.db.collection('users').doc(this.tokenRef);
      var increment = firebase.firestore.FieldValue.increment(1);
      //Update
      userRef.set(
        { 
          codigo_ref : this.tokenRef,
          cantidad_ref : increment
        },
        { merge : true }
      );
    }
    //send login
    this.router.navigate(['/']);
  }

  registrar(f) {
    var noError = true;
    $("#error").text("");
    if(f.contrasena == f.confirmar){      
      let data = {
        nombres : f.nombres,
        apellidos : f.apellidos,
        correo : f.correo,
        contrasena : f.contrasena,
      }
      data["referCode"] = this.routerActive.snapshot.params.token;
      firebase.auth().createUserWithEmailAndPassword(data.correo,data.contrasena).then(res=>{
        this.router.navigate(['/']);
        return this.updateProfileWithSing(data);
      }).catch(err=>{
        var errorCode = err.code;
        var errorMessage = err.message;

        console.log(errorCode);
        console.log(errorCode);
        // ...
        noError = false;

        if(err.code === "auth/email-already-in-use") $("#error").text("El correo ingresado ya está en uso");
      });
      
      // firebase.auth().createUserWithEmailAndPassword(f.correo ,f.contrasena)
      // .catch(function(error) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;

      //   console.log(errorCode);
      //   console.log(errorCode);
      //   // ...
      //   noError = false;
      //   $("#error").text("El correo ingresado ya está en uso");
      // }).then(() =>{
      //   if(noError){
      //     var user = firebase.auth().currentUser;
      //     user.sendEmailVerification().then(function() {
      //       // Email sent
      //       console.log("Correo enviado.");
      //     }).catch(function(error) {
      //       $("#error").text("Ocurrio un error inesperado al tratar de enviar el correo de verificación.");
      //       console.log(error);
      //     });
      //     this.insertarRegistro(f);
      //   }
      // });
    }else{
      $("#error").text("Las contraseñas no coinciden");
    }
  }

  updateProfileWithSing(data){
    firebase.auth().signInWithEmailAndPassword(data.correo,data.contrasena).then(async res=>{
      let token = await firebase.auth().currentUser.getIdToken();
      this.authFirebaseService.setTokenToLocalstorage(token);
      this.authFirebaseService.updateProfile(data).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      })
    }).catch(err=>{
      console.log(err);
    });
  }

  async updateProfileByDatabase(data){
    let token = await firebase.auth().currentUser;
    this.db.collection("users").doc(token.uid).set(data,{merge:true}).then(res=>{
      console.log(res);
    }).catch(err => {
      console.log(err);
      this.updateProfile(data);
    });
  }

  updateProfile(data){
    this.authFirebaseService.updateProfile(data).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  redirectProfile(){
    this.router.navigate(["/profile"]);
  }
  loginWithGoogle() {
    this.authFirebaseService.googleSignin().then( async res => {
      let currentUser = firebase.auth().currentUser;
      let token = await currentUser.getIdToken();
      this.authFirebaseService.setTokenToLocalstorage(token);
      if (res.additionalUserInfo.isNewUser) {
        let authenticateData = JSON.parse(JSON.stringify(res.additionalUserInfo.profile));
        let dataUpdate = {
          nombres: authenticateData.given_name,
          apellidos: authenticateData.family_name,
        }
        // this.StorageService.store("userData",`${authenticateData.given_name} ${authenticateData.family_name}`);
        // this.StorageService.store("urlPhoto",`${currentUser.photoURL}`);
        if(this.routerActive.snapshot.params.token) dataUpdate["referCode"] = this.routerActive.snapshot.params.token;
        setTimeout(()=>{
          this.updateProfileByDatabase(dataUpdate);
          this.redirectProfile()
        },3000);
      }
      else {
        this.getData();
        this.redirectProfile();
      }
    },
      err => {
        $("#error").text("Ha ocurrido un error");
      })
  }

  loginWithFacebook() {
    this.authFirebaseService.facebookSignin().then(async res => {
      let currentUser = await firebase.auth().currentUser;
      let token = await currentUser.getIdToken();
      this.authFirebaseService.setTokenToLocalstorage(token);
      if (res.additionalUserInfo.isNewUser) {
        let authenticateData = JSON.parse(JSON.stringify(res.additionalUserInfo.profile));
        let dataUpdate = {
          nombres: authenticateData.given_name,
          apellidos: authenticateData.family_name,
        }
        // this.StorageService.store("userData",`${authenticateData.given_name} ${authenticateData.family_name}`);
        // this.StorageService.store("urlPhoto",`${currentUser.photoURL}`);
        if(this.routerActive.snapshot.params.token) dataUpdate["referCode"] = this.routerActive.snapshot.params.token;
        setTimeout(()=>{
          this.updateProfileByDatabase(dataUpdate);
          this.redirectProfile();
        },3000);
      }
      else {
        this.getData();
        this.redirectProfile();
      }
    },
      err => {
        $("#error").text("Ha ocurrido un error");
      })
  }

  getData(){
    this.authFirebaseService.getUserData().then(res=>{
      console.log(res);
    })
  }

  refered(code) {
    this.authFirebaseService.referedBy({ referCode: code }).subscribe(
      res => {
        console.log("Codigo de referencia actualizado");
      },
      err => {
        console.log(err);
      });
  }

  registerGoogleUSer(){
    if(this.actualizarReferidos() != false){this.routerActive.snapshot.params.token;}
    this.authService.registerGoogleUSer(this.tokenRef)
    .then((res) => {    
      if(this.actualizarReferidos() != false){
        var userRef = this.db.collection('users').doc(this.tokenRef);
        if(userRef != null){
          var increment = firebase.firestore.FieldValue.increment(1);
          //Update
          userRef.set(
            { 
              cantidad_ref : increment
            },
            { merge : true }
          );
        }
      }  
    }).catch(error => {
      console.log(error);
      console.log(error.code);
    })
  }
}

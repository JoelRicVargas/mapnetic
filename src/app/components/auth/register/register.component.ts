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
    // var noError = true;
    $("#error").text("");
    if(f.contrasena == f.confirmar){      
      let data = {
        nombres : f.nombres,
        apellidos : f.apellidos,
        correo : f.correo,
        contrasena : f.contrasena,
      }
      data["referedBy"] = this.routerActive.snapshot.params.token;
      this.authFirebaseService.register(data).subscribe(res =>{
        $("#modalMail").click();
        var cont = 0;
        setInterval(() => {
          if(cont == 0 ){this.router.navigate(['/']); cont++;clearInterval();}
        },5000)
      },
      err =>{
        if(err.error.code === "auth/email-already-exists") {
          $("#error").text("El correo ingresado ya está en uso");
        }
      })
    }else{
      $("#error").text("Las contraseñas no coinciden");
    }
  }

  async updateProfileByDatabase(data){
    let token = await firebase.auth().currentUser;
    this.db.collection("users").doc(token.uid).set(data,{merge:true}).then(res=>{
      if(data.referedBy){
        this.authFirebaseService.updateRefersCount(data).subscribe(res=>{
          console.log("Usuario referido de : "+data.referedBy);
        });
      }
      this.redirectProfile();
    }).catch(err => {
      console.log(err);
      this.updateProfile(data);
    });
  }

  updateProfile(data){
    this.authFirebaseService.updateProfile(data).subscribe(res => {
      this.redirectProfile();
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
        if(this.routerActive.snapshot.params.token) dataUpdate["referedBy"] = this.routerActive.snapshot.params.token;
        await this.db.collection("users").doc(currentUser.uid).set(dataUpdate);
        setTimeout(()=>{
          this.redirectProfile();
        },2000);
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
          nombres: authenticateData.name,
          apellidos: authenticateData.last_name,
        }
        if(this.routerActive.snapshot.params.token) dataUpdate["referedBy"] = this.routerActive.snapshot.params.token;
        await this.db.collection("users").doc(currentUser.uid).set(dataUpdate,{merge:true});
        setTimeout(()=>{
          this.redirectProfile();
        },2000);
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
    this.authFirebaseService.getUserData();
  }

  refered(code) {
    this.authFirebaseService.referedBy({ referedBy: code }).subscribe(
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
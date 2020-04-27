import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'Jquery';
import { Router ,ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/service-auth.service';

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
              private authService : AuthService) { }

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
      firebase.auth().createUserWithEmailAndPassword(f.correo ,f.contrasena)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorCode);
        // ...
        noError = false;
        $("#error").text("El correo ingresado ya está en uso");
      }).then(() =>{
        if(noError){
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then(function() {
            // Email sent
            console.log("Correo enviado.");
          }).catch(function(error) {
            $("#error").text("Ocurrio un error inesperado al tratar de enviar el correo de verificación.");
            console.log(error);
          });
          this.insertarRegistro(f);
        }
      });
    }else{
      $("#error").text("Las contraseñas no coinciden");
    }
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

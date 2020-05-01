import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'Jquery';
import { Router ,ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/service-auth.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  db = firebase.firestore();
  private tokenRef = "";
  timeLeft: number = 60;

  constructor(private router : Router, 
              private routerActive : ActivatedRoute,
              private authService : AuthService) { 
                
  }

  ngOnInit(): void {}

  actualizarReferidos(){
    this.tokenRef = this.routerActive.snapshot.params.token;
    if(this.tokenRef != null){
      if(this.tokenRef.length == 8){
        return true;
      }
    }
    return false;
  }

  insertarRegistro(f){
    var contador = 0;
    var usuario = this.db.collection("users");
    var cod_uid = this.generateId(8);
    var token_referido = "";
    if(this.actualizarReferidos()){
      token_referido = this.tokenRef;
    }
    //Primero registra el email si no ocurre un error pasa
    usuario.add({
      nombres : f.nombres,
      apellidos : f.apellidos,
      correo : f.correo,
      contrasena : f.contrasena,
      direccion : '',
      telefono : '',

      codigo_uid : cod_uid,
      codigo_ref : token_referido,
      plan_actual : 'Ninguno',
      cantidad_ref : 0,
      dinero_generado : 0.00,
      perfil_aprovado : 'No',
      foto : '',
      portada : '',
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

    this.setReferidos();
    //send login
    setInterval(() => {
      if(contador == 0 ){this.router.navigate(['/']); contador++;}
    },5000)
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
            $("#modalMail").click();
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
    if(this.actualizarReferidos() != false)
    {this.routerActive.snapshot.params.token;}
    else{this.tokenRef = "";}
    this.authService.registerGoogleUSer(this.tokenRef)
    .then((res) => {    
      if(this.actualizarReferidos() != false){
        this.setReferidos();
      }  
      //this.router.navigate(['/profile']);
    }).catch(error => {
      console.log(error);
      console.log(error.code);
    })
  }

  setReferidos() :void{
    if(this.actualizarReferidos() != false){
      var user  = this.db.collection('users').where('codigo_uid','==',this.tokenRef).get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              console.log(doc.id, " => ", doc.data());
              var documento = doc.id ;
              localStorage.setItem('user_token', JSON.stringify(documento));
          });
          console.log(userLocal);
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
      var userLocal = JSON.parse(localStorage.getItem("user_token"));
      if(userLocal != ''){
        var userRef = this.db.collection('users').doc(userLocal);
        var increment = firebase.firestore.FieldValue.increment(1);
        userRef.set(
          { 
            cantidad_ref : increment
          },
          { merge : true }
        );
        localStorage.removeItem("user_token");
      }
    }
  }
  dec2hex (dec) {
    return ('0' + dec.toString(16)).substr(-2)
  }
  
  generateId (len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, this.dec2hex).join('')
  }
}




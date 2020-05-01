import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registro: any = {
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    confirmar: ''
  }


  db = firebase.firestore();
  private tokenRef = "";
  timeLeft: number = 60;


  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    
  }

  insertarRegistro() {
    if (this.registro.contrasena == this.registro.confirmar) {
      let data = {
        nombres: this.registro.nombres,
        apellidos: this.registro.apellidos,
        correo: this.registro.correo,
        contrasena: this.registro.contrasena,
        direccion: '',
        telefono: '',
        plan_actual: 'Ninguno',
        cantidad_ref: 0,
        dinero_generado: 0.00,
        perfil_aprovado: false
      }
      firebase.auth().createUserWithEmailAndPassword(data.correo,data.contrasena).then(res=>{
        return this.updateProfile(data);
      }).catch(err=>{
        console.log(err);
        if(err.code === "auth/email-already-in-use") alert("Email ya registrado");
      });
      //this.registrar();
    }
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        // this.router.navigate(['<!-- enter your route name here -->']);
      })
  }

  updateProfile(data){
    firebase.auth().signInWithEmailAndPassword(data.correo,data.contrasena).then(async res=>{
      let token = await firebase.auth().currentUser.getIdToken();
      this.authService.setTokenToLocalstorage(token);
      this.authService.updateProfile(data).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      })
    }).catch(err=>{
      if(err.message === "EMAIL_EXISTS") alert("Ha ocurrido un error al registrarse");
    });
  }

  registrar() {

    firebase.auth().createUserWithEmailAndPassword(this.registro.correo, this.registro.contrasena).then(
      res => {
        console.log(res);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorCode);
        // ...
      });

  };
}


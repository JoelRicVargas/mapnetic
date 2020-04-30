import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registro : any = {
    nombres : '',
    apellidos : '',
    correo : '',
    contrasena : '',
    confirmar : ''
  }

  db = firebase.firestore();

  constructor(
    private apiService : ApiService,
  ) { }

  ngOnInit(): void {
  }

  insertarRegistro(){

    if(this.registro.contrasena == this.registro.confirmar){
      this.apiService.register({
        nombres : this.registro.nombres,
        apellidos : this.registro.apellidos,
        correo : this.registro.correo,
        contrasena : this.registro.contrasena,
        direccion : '',
        telefono : '',

        codigo_ref : '',
        plan_actual : 'Ninguno',
        cantidad_ref : 0,
        dinero_generado : 0.00,
        perfil_aprovado : false
  
      }).subscribe(res=>{
        console.log("Registro Exitoso");
        firebase.auth().signInWithEmailAndPassword(this.registro.correo, this.registro.contrasena).then(res=>{
          this.SendVerificationMail();
        }).catch(err=>{
          console.error(err);
        });
      },error=>{
        alert("Ha ocurrido un error");
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
  

  registrar() {

    firebase.auth().createUserWithEmailAndPassword(this.registro.correo, this.registro.contrasena).then(
      res=>{
        console.log(res);
      })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorCode);
      // ...
    });
    
  };

}

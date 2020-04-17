import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

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

  constructor() { }

  ngOnInit(): void {
  }

  insertarRegistro(){

    this.db.collection("users").add({
      nombres : this.registro.nombres,
      apellidos : this.registro.apellidos,
      correo : this.registro.correo,
      contrasena : this.registro.contrasena,
      codigo : 'TEST1452'

    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

    this.registrar();

  }

  registrar() {

    firebase.auth().createUserWithEmailAndPassword(this.registro.correo, this.registro.contrasena)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorCode);
      // ...
    });

    //console.log(userInfo)

    //this.verificarUser();

    //this.verificarUser();
    //console.log(this.item);
    
  };

}

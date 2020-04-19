import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { QueryDocumentSnapshot, QuerySnapshot } from 'angularfire2/firestore';

@Component({
  selector: 'app-profile-description',
  templateUrl: './profile-description.component.html',
  styleUrls: ['./profile-description.component.css']
})
export class ProfileDescriptionComponent implements OnInit {

  registro : any = {
    nombres : '',
    apellidos : '',
    contrasena : '',
    correo : '',
    direccion : '',
    telefono : '',

    codigo_ref : '',
    plan_actual : '',
    cantidad_ref : '',
    dinero_generado : '',
    perfil_aprovado : false
  }

  //documento : String

  db = firebase.firestore();

  documento : any

 //documento : any

  constructor() {
    //this.obtener_usuario();
   }

  ngOnInit(): void {
    //this.registro ={}
    this.obtener_usuario(this.registro);
    
  }

  actualizar(){

    var user_documento = (<HTMLInputElement>document.getElementById('documento')).value;

    


    var cityRef = this.db.collection('users').doc(user_documento);

    var setWithMerge = cityRef.set({
      nombres : (<HTMLInputElement>document.getElementById('nombres')).value,
      apellidos : (<HTMLInputElement>document.getElementById('apellidos')).value,
      contrasena : (<HTMLInputElement>document.getElementById('contrasena')).value,
      correo : (<HTMLInputElement>document.getElementById('correo')).value,
      direccion : (<HTMLInputElement>document.getElementById('direccion')).value,
      telefono : (<HTMLInputElement>document.getElementById('telefono')).value,
    }, { merge: true });

  }

  obtener_usuario(param : any){

    var user = firebase.auth().currentUser;

    this.db.collection("users").where("correo", "==", user.email)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().nombres);

            param  = {

              nombres : doc.data().nombres,
              apellidos : doc.data().apellidos,
              contrasena : doc.data().contrasena,
              correo : doc.data().correo,
              direccion : doc.data().direccion,
              telefono : doc.data().telefono,
          
              codigo_ref : doc.id,
              plan_actual : doc.data().plan_actual,
              cantidad_ref : doc.data().cantidad_ref,
              dinero_generado : doc.data().dinero_generado,
              perfil_aprovado : doc.data().perfil_aprovado
        
            };

            (<HTMLInputElement>document.getElementById('documento')).value = doc.id + '';

            (<HTMLInputElement>document.getElementById('nombres')).value = param.nombres + '';

            (<HTMLInputElement>document.getElementById('apellidos')).value = param.apellidos + '';
            (<HTMLInputElement>document.getElementById('contrasena')).value = param.contrasena + '';
            (<HTMLInputElement>document.getElementById('correo')).value = param.correo + '';
            (<HTMLInputElement>document.getElementById('direccion')).value = param.direccion + '';
            (<HTMLInputElement>document.getElementById('telefono')).value = param.telefono + '';

            (<HTMLInputElement>document.getElementById('codigo_ref')).value = param.codigo_ref + '';
            (<HTMLInputElement>document.getElementById('plan_actual')).value = param.plan_actual + '';
            (<HTMLInputElement>document.getElementById('cantidad_ref')).value = param.cantidad_ref + '';
            (<HTMLInputElement>document.getElementById('dinero_generado')).value = param.dinero_generado + '';
            (<HTMLInputElement>document.getElementById('perfil_aprovado')).value = param.perfil_aprovado + '';

        });

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }

}

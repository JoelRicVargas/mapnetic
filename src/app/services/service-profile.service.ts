import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public urlImageFoto : Observable<string>;
  public urlImagePortada : Observable<string>;

  public set_nombres;

  constructor(private storage: AngularFireStorage) { 
  }

  registro : any = {
    nombres : '',
    apellidos : '',
    contrasena : '',
    correo : '',
    direccion : '',
    telefono : '',
    foto : '',
    portada : '',

    codigo_ref : '',
    plan_actual : '',
    cantidad_ref : '',
    dinero_generado : '',
    perfil_aprovado : false
  }

  //documento : String
  db = firebase.firestore();

  documento : any;

  ngOnInit(): void {}
  
  actualizar(){
    console.log("Actualizando datos de usuario...");
    //Change password
    var user_documento = $("#documento").val();
    //var newPassword = getASecureRandomPassword();
    var user = firebase.auth().currentUser;
    var cityRef = this.db.collection('users').doc(user_documento)
    var setWithMerge = cityRef.set({
      nombres : $("#nombres").val(),
      apellidos : $("#apellidos").val(),
      contrasena : $("#contrasena").val(),
      //correo : $("#correo").val(),
      direccion : $("#direccion").val(),
      telefono : $("#telefono").val(),
      foto : $("#photo_profile").val(),
      portada : $("#portada_profile").val(),
    }, { merge: true });
    this.updateClosing();
    
    var user = firebase.auth().currentUser;
    user.updatePassword($("#contrasena").val()).then(function() {
      console.log("Actualizando password...");
    }).catch(function(error) {
      console.log(error.code);
      console.log(error);
    });
  }

 /* obtener_usuario(){
    console.log("Obteniendo datos de usuario ...");
    var userLocal = JSON.parse(localStorage.getItem("user"));
    var user = firebase.auth().currentUser;
    //console.log(user.email);
    this.db.collection("users").where("correo", "==", userLocal.email)
    .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().nombres);
            var param  = {
              nombres : doc.data().nombres,
              apellidos : doc.data().apellidos,
              contrasena : doc.data().contrasena,
              correo : doc.data().correo,
              direccion : doc.data().direccion,
              telefono : doc.data().telefono,
              foto : doc.data().foto,
              portada : doc.data().portada,

              codigo_uid : doc.data().codigo_uid,
              codigo_ref : doc.id,
              plan_actual : doc.data().plan_actual,
              cantidad_ref : doc.data().cantidad_ref,
              dinero_generado : doc.data().dinero_generado,
              perfil_aprovado : doc.data().perfil_aprovado
            };
            $("#documento").val(doc.id);
            $("#nombres").val(param.nombres);
            $(".nombres_text").text(param.nombres);
            $("#apellidos").val(param.apellidos);
            $("#contrasena").val(param.contrasena);
            //$("#correo").val(param.correo);
            $("#direccion").val(param.direccion);
            $("#telefono").val(param.telefono);
            $("#photo_profile").val(param.foto);
            $("#portada_profile").val(param.portada);

            if(param.foto != ''){$(".foto_profile").attr('src',param.foto);}
            if(param.portada != ''){$("#banner_profile").
            css('background-image','url('+ param.portada +')');}

            $("#cod_referidos").val(window.location.origin + "/register/" + param.codigo_uid);
            $("#plan_actual").text(param.plan_actual);
            $("#cantidad_ref").text(param.cantidad_ref);
            $("#dinero_generado").text(param.dinero_generado);
            $("#perfil_aprovado").text(param.perfil_aprovado);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
*/

  getURL(path){
    // Create a reference to the file to delete
    const ref = this.storage.ref(path);
    const downloadURL = ref.getDownloadURL();
    downloadURL.subscribe(url=>{
      if(url){
          alert(url);
          $("#banner_profile").css('background-image','url('+ url +')');
          //wirte the url to firestore
      }
   })
  }

  copiarAlPortapapeles() {
    $("#state_copy").text("");
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($("#cod_referidos").val()).select();
    document.execCommand("copy");
    $("#state_copy").text("Copiado correctamente!");
    $temp.remove();
  }
  
  updateClosing(){
    $(".edit_input").css('pointer-events','none');
    $(".edit_input").removeClass('edit');
    $(".banner .overlayed").css('display','none');
    $("#btn_actualizar").css('display','none');
  }

  async updateRef(data){
    let id = await firebase.auth().currentUser.uid;
    this.db.collection("users").doc(id).get().then(res=>{
      if(res.exists){
        let document = res.data();
        res.ref.set(data,{merge:true}).catch(err=>{
          console.log("Ha ocurrido un error al realizar la operacion");
        }).then(res=>{
          console.log("operación exitosa");
        })
      }
    })
  }

  deleteImageStorage(ref){
    if(ref === null) return;
    // Create a reference to the file to delete
    var storageRef = firebase.storage().ref();
    var desertRef = storageRef.child(ref);
    console.log("Eliminando archivo anterior...");
    // Delete the file
    desertRef.delete().then(function() {
      console.log("Se elimino correctamente la foto antigua!");
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });
  }
}

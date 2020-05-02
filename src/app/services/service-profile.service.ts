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
  private filePortada;
  
  constructor(private storage: AngularFireStorage) { }

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
    console.log("Actualizando datos de usario...");
    var user_documento = $("#documento").val();
    var cityRef = this.db.collection('users').doc(user_documento)
    var setWithMerge = cityRef.set({
      nombres : $("#nombres").val(),
      apellidos : $("#apellidos").val(),
      contrasena : $("#contrasena").val(),
      correo : $("#correo").val(),
      direccion : $("#direccion").val(),
      telefono : $("#telefono").val(),
      foto : $("#photo_profile").val(),
      portada : $("#portada_profile").val(),
    }, { merge: true });
    this.updateClosing();
    //this.updatePortada(); 
  }

  obtener_usuario(param : any){
    console.log("Obteniendo datos de usuario ...");
    var user = firebase.auth().currentUser;
    this.db.collection("users").where("correo", "==", user.email)
    .get().then(function(querySnapshot) {
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
              foto : doc.data().foto,
              portada : doc.data().portada,

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
            $("#correo").val(param.correo);
            $("#direccion").val(param.direccion);
            $("#telefono").val(param.telefono);
            $("#photo_profile").val(param.foto);
            
            $("#portada_profile").val(param.portada);

            if(param.foto != null){$(".foto_profile").attr('src',param.foto);}
            //if(param.portada != null){$("#banner_profile").
            //css('background-image','url('+ param.portada +')');}

            $("#cod_referidos").val("http://localhost:4200/register/" + doc.id);
            $("#plan_actual").text(param.plan_actual);
            $("#cantidad_ref").text(param.cantidad_ref);
            $("#dinero_generado").text(param.dinero_generado);
            $("#perfil_aprovado").text(param.perfil_aprovad);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }


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
}

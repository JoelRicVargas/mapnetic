import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as $ from 'jquery';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';


@Component({
  selector: 'app-profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrls: ['./profile-banner.component.css']
})
export class ProfileBannerComponent implements OnInit {
  @Input() urlPhoto : any;
  @Input() urlPortada : any;
  urlImageFoto : Observable<string>;
  urlImagePortada : Observable<string>;

  db = firebase.firestore();

  constructor(private storage: AngularFireStorage) {

   }

  ngOnInit(): void {
  } 

  uploadPerfil($event){
    $("#btn_actualizar").css('display','none');
    const id = Math.random().toString(36).substring(2);
    const file = $event.target.files[0];
    $(".foto_profile").attr('src',URL.createObjectURL($event.target.files[0]));
    const filePath = `uploads/profile/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(()=>{ 
        this.urlImageFoto = ref.getDownloadURL();
        console.log('Obteniendo URL...');
        console.log(this.urlImageFoto);
        $("#btn_actualizar").css('display','block');
      }
    )).subscribe();
  }
  uploadPortada($event){
    $("#btn_actualizar").css('display','none');
    const id = Math.random().toString(36).substring(2);
    const file = $event.target.files[0];
    $("#banner_profile").css('background-image','url('+ URL.createObjectURL($event.target.files[0]) +')');
    const filePath = `uploads/profile/portada_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    //this.deleteImageStorage();
    task.snapshotChanges().pipe(finalize(()=>{ 
        this.urlImagePortada = ref.getDownloadURL();
        console.log('Obteniendo URL...');
        console.log(this.urlImageFoto);
        $("#btn_actualizar").css('display','block');
      }
    )).subscribe();
  }

  deleteImageStorage(){
    // Create a reference to the file to delete
    var storageRef = firebase.storage().ref();
    var desertRef = storageRef.child('uploads/profile/portada_a3o970sj6rj');
    console.log("Eliminando archivo anterior...");
    // Delete the file
    desertRef.delete().then(function() {
      console.log("Se elimino correctamente la foto antigua!");
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });
  }
}


import { Component, OnInit, ElementRef, ViewChild, Input, NgZone } from '@angular/core';
import * as $ from 'jquery';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';
import { ProfileService } from 'src/app/services/service-profile.service';
import { AuthFirebaseService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';



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
  data : any = {};  
  constructor(
    private storage: AngularFireStorage,
    private ProfileService : ProfileService,
    private ngZone: NgZone,
    private AuthFirebaseService: AuthFirebaseService,
    private StorageService : StorageService
    ) {
      // this.StorageService.changes.subscribe(res=>{
      //   if(res.key === "userMapnetic"){
      //     this.ngZone.run( () => {
      //       this.data = Object.assign({},res.value);
      //     });
      //   }
      // })
   }

  ngOnInit(): void {
    this.getUserData();
  } 

  getUserData(){
    return this.AuthFirebaseService.getUserData().subscribe(res=>{
      let dataAux = {};
      Object.keys(res).map(key =>{
        dataAux[key] = res[key];
      })
      this.ngZone.run( () => {
        this.data = dataAux;
      });
    });
    //.then(res=> {
    //   if(!res) return;
    //   let dataAux = {};
    //   Object.keys(res).map(key =>{
    //     dataAux[key] = res[key];
    //   }) 
    //   this.ngZone.run( () => {
    //     this.data = dataAux;
    //  });
    // }).catch(err=>console.log(err));
  }

  async uploadPerfil($event){
    $("#btn_actualizar").css('display','none');
    const id = await firebase.auth().currentUser.uid;//Math.random().toString(36).substring(2);
    const file = $event.target.files[0];
    $(".foto_profile").attr('src',URL.createObjectURL($event.target.files[0]));
    const filePath = `uploads/profile/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file) ;
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url=>{
          this.ProfileService.updateRef({"photo": url, "photoLocal": filePath});
        },err=>{
          console.log("Ha ocurrido un error al obtener la url");
        })
      }))
  .subscribe()
  }

  changePhotoKey(key,ref){
    
  }

  async uploadPortada($event){
    $("#btn_actualizar").css('display','none');
    const id = await firebase.auth().currentUser.uid;//Math.random().toString(36).substring(2);
    const file = $event.target.files[0];
    $("#banner_profile").css('background-image','url('+ URL.createObjectURL($event.target.files[0]) +')');
    const filePath = `uploads/cover/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    //this.deleteImageStorage();
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url=>{
          this.ProfileService.updateRef({"cover": url, "coverLocal": filePath});
        },err=>{
          console.log("Ha ocurrido un error al obtener la url");
        })
      }))
    .subscribe()
    // .pipe(finalize(()=>{ 
    //     this.urlImagePortada = ref.getDownloadURL();
    //     console.log('Obteniendo URL...');
    //     console.log(this.urlImageFoto);
    //     $("#btn_actualizar").css('display','block');
    //   }
    // )).subscribe();
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


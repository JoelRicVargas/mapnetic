import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { AuthFirebaseService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/service-profile.service';
import * as firebase from 'firebase';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements AfterViewInit {

  data : any;
  db = firebase.firestore();
  constructor(
    private AuthFirebaseService : AuthFirebaseService,
    private ngZone: NgZone,
    private StorageService : StorageService
    ) {
      // this.StorageService.changes.subscribe(res=>{
      //   if(res.key === "userMapnetic"){
      //     this.ngZone.run( () => {
      //       this.data = res.value;
      //     });
      //   }
      // })
      this.data = {};
    }

  ngAfterViewInit(): void {
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
  }


}

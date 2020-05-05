import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as firebase from 'firebase';
import { QueryDocumentSnapshot, QuerySnapshot } from 'angularfire2/firestore';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { ProfileService } from 'src/app/services/service-profile.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile-description',
  templateUrl: './profile-description.component.html',
  styleUrls: ['./profile-description.component.css']
})
export class ProfileDescriptionComponent implements OnInit {
  @Input() data: any;
  db = firebase.firestore();
  user : any = {};
  constructor(
    private profileService: ProfileService,
    private ApiService: ApiService
  ) {

  }

  ngOnInit() {
    this.getAuth();
  }

  actualizar(data) {
    this.ApiService.update(data).subscribe(res=>{
      console.log("Actualización Exitosa");
    },err=>{
      console.log(err);
    })
    //this.profileService.actualizar();
  }

  copiarAlPortapapeles() {
    this.profileService.copiarAlPortapapeles();
  }


  getAuth() {
    // this.AuthFirebaseService.getAuth().subscribe(res => {
    //   this.user = res.user;
    // }, err => {
    //   console.log(err);
    //   alert("Ha ocurrido un error");
    // })
  }
}

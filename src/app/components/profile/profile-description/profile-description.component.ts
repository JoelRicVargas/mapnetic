import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as firebase from 'firebase';
import { QueryDocumentSnapshot, QuerySnapshot } from 'angularfire2/firestore';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { ProfileService } from 'src/app/services/service-profile.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthFirebaseService } from 'src/app/services/auth.service';

declare var close_edit_module: Function;

@Component({
  selector: 'app-profile-description',
  templateUrl: './profile-description.component.html',
  styleUrls: ['./profile-description.component.css']
})
export class ProfileDescriptionComponent implements OnInit {
  @Input() data: any;
  db = firebase.firestore();
  user : any = {};
  editMode : boolean = false;
  changePassword : boolean = false;
  changeData : boolean = false;
  constructor(
    private profileService: ProfileService,
    private ApiService: ApiService,
    private AuthFirebaseService: AuthFirebaseService,
  ) {

  }

  changeInput(){
    this.changeData = true;
  }

  ngOnInit() {
    this.getAuth();
  }

  actualizar(data) {
    $('#error').text("");
    $('#success').text("");
    if(this.changeData){
      if(data.contrasena && !data.confirmar) return $('#error').text("Debe confirmar la contraseña");
      if(data.contrasena && data.confirmar && data.contrasena !== data.confirmar) return $('#error').text("Contraseñas no coinciden");
      this.ApiService.update(data).subscribe(res=>{
        this.AuthFirebaseService.getUserData();
        this.changeData = false;
        this.editMode = false;
        close_edit_module();
        $('#success').text("Actualizacion exitosa");
      },err=>{
        console.log(err);
       
      });
    }
    else{
      this.editMode = false;
      close_edit_module();
    }
  }

  copiarAlPortapapeles() {
    this.profileService.copiarAlPortapapeles();
  }


  getAuth() {
    this.AuthFirebaseService.getAuth().subscribe(res => {
      this.user = res.user;
    }, err => {
      console.log(err);
      alert("Ha ocurrido un error");
    })
  }
}
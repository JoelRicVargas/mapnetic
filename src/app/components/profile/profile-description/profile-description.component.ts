import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { QueryDocumentSnapshot, QuerySnapshot } from 'angularfire2/firestore';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { ProfileService } from 'src/app/services/service-profile.service';

@Component({
  selector: 'app-profile-description',
  templateUrl: './profile-description.component.html',
  styleUrls: ['./profile-description.component.css']
})
export class ProfileDescriptionComponent{
  //documento : any
  constructor(private profileService : ProfileService) {
    
  }

  actualizar(){
    this.profileService.actualizar();
  }
  copiarAlPortapapeles(){
    this.profileService.copiarAlPortapapeles();
  }
}

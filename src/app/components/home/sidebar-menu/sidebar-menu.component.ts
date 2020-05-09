import { Component, OnInit, NgZone } from '@angular/core';
import $ from 'jquery';
import { ProfileService } from 'src/app/services/service-profile.service';
import { StorageService } from 'src/app/services/storage.service';
import * as firebase from 'firebase';
import { AuthFirebaseService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  data : any = {};  
  constructor(
    private ngZone: NgZone,
    private StorageService : StorageService,
    private AuthFirebaseService: AuthFirebaseService
    ) { 
    if(localStorage.getItem("userMapnetic")){
      this.ngZone.run( () => {
        this.getUserData();
      });
    };
    //this.profileService.obtener_usuario(this.registro);
    // this.StorageService.changes.subscribe(data=>{
    //  if(data.key === "userMapnetic" && data.value) this.ngZone.run( () => {
    //   this.data = Object.assign({}, data.value);
    //   }); 
    // })
  }

  getUserData(){
    return this.AuthFirebaseService.getUserData().then(res=> {
      if(!res) return;
      let dataAux = {};
      Object.keys(res).map(key =>{
        dataAux[key] = res[key];
      }) 
      this.ngZone.run( () => {
        this.data = dataAux;
     });
    }).catch(err=>console.log(err));
  }

  db = firebase.firestore();

  ngOnInit(): void {
    this.getUserData();
    $('#dismiss, .overlay').on('click', function () {
      $('#sidebar').removeClass('active');
      $('.overlay').fadeOut();
    });
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').fadeIn();
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  config : any = {
    tonos_mensajes : null,
    vibracion_mensajes : null,
    recibir_notificaciones : null,
    otros_notificaciones : null
  }

  constructor(
    private ConfigurationService : ConfigurationService
  ) {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) this.getConfiguration();
    });
   }

  ngOnInit(): void {
    this.getConfiguration();
  }

  getConfiguration(){
    this.ConfigurationService.getConfig().then(res=>{
      this.config = res;
    },err=>{
      console.log(err);
    })
  }

  setConfiguration(data){
    if(!data) data = this.config;
    this.ConfigurationService.setConfig(data).then(res=>{
      console.log("Actualización Exitosa");
    }).catch(err=>{
      alert("Ha ocurrido un error en la actualizacion");
    })
  }

}

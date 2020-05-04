import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  packs = [];
  constructor(
    private ApiService : ApiService
  ) { }

  ngOnInit(): void {
    this.getPacks();
  }

  getPacks(){
    this.ApiService.getPacks().subscribe(res=>{
      this.packs = res;
    },
    err => {
      alert("Ha ocurrido un error al consultar los paquetes");
    })
  }

}

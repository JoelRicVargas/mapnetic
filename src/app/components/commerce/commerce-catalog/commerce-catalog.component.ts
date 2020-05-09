import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-commerce-catalog',
  templateUrl: './commerce-catalog.component.html',
  styleUrls: ['./commerce-catalog.component.css']
})
export class CommerceCatalogComponent implements OnInit {

  @Input() data: any ={
    ofert:null,
    rewardType:null,
    description: null
  }
  constructor(  private ApiService: ApiService,) { }
  ngOnInit(): void {
  }

  crearCatalogo(data){
    this.ApiService.createCatalogue(data).subscribe(res=>{
      console.log("Creacion exitosa");
    },err=>{
      console.log(err);
    });
  }

}

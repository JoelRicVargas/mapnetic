import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  data : any = {};
  constructor(
    private ApiService : ApiService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.ApiService.getConfigCommerce().subscribe(res=>{
      this.data = res;
    },err=>{
      console.log(err);
      alert("Ha ocurrido un error");
    })
  }

  setData(data){
    this.ApiService.setConfigCommerce(data).subscribe(res=>{
      console.log("Operacion exitosa");
    },err=>{
      console.log(err);
      alert("Ha ocurrido un error");
    })
  }

}

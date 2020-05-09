import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {
  @Input() data: any ={
    ofert:null,
    rewardType:null,
    reward: null
  }
  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
  }

  crearOferta(data){
    this.ApiService.createOffer(data).subscribe(res=>{
      console.log("Creacion exitosa");
    },err=>{
      console.log(err);
    })
  }

}

import { Component, OnInit, NgZone } from '@angular/core';
import { AuthFirebaseService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-commerce-banner',
  templateUrl: './commerce-banner.component.html',
  styleUrls: ['./commerce-banner.component.css']
})
export class CommerceBannerComponent implements OnInit {

  data :any = {};
  constructor(
    private ApiService : ApiService,
    private ngZone: NgZone
    ) {
    }


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

}

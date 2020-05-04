import { Component, OnInit, NgZone } from '@angular/core';
import { AuthFirebaseService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-commerce-banner',
  templateUrl: './commerce-banner.component.html',
  styleUrls: ['./commerce-banner.component.css']
})
export class CommerceBannerComponent implements OnInit {

  data :any = {};
  constructor(
    private AuthFirebaseService : AuthFirebaseService,
    private ngZone: NgZone
    ) {
    }


  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    return this.AuthFirebaseService.getUserData().then(res=> {
      if(!res) return;
      let dataAux :any = {};
      Object.keys(res).map(key =>{
        dataAux[key] = res[key];
      });
      dataAux["displayName"] = (dataAux.nombres || '')+"  "+ (dataAux.apellidos)
      this.ngZone.run( () => {
        this.data = dataAux;
     });
    }).catch(err=>console.log(err));
  }

}

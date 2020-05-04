import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-package-buy',
  templateUrl: './package-buy.component.html',
  styleUrls: ['./package-buy.component.css']
})
export class PackageBuyComponent implements OnInit {

  form = {
    email : null,
    password : null,
    address1 : null,
    address2 : null,
    city : null,
    zip : null,
    card : null
  }
  constructor(
    private ApiService : ApiService,
    private routerActive : ActivatedRoute,
  ) { }
  

  ngOnInit(): void {
  }

  buyPackage(data){
    data.package =  this.routerActive.snapshot.params.id;
    this.ApiService.buyPackage(data).subscribe(res=>{

    }, 
    err=>{

    })
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router  } from '@angular/router';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router : Router){}
  
  canActivate(){
    var user = firebase.auth();
    if(user.currentUser){
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }
  
}

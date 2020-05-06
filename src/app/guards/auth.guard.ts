import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router  } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { AuthFirebaseService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router, private  AuthFirebaseService : AuthFirebaseService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.afAuth.authState.pipe(map((res) => {
        if (res && res.uid){
          res.getIdToken().then(res=>{
            this.AuthFirebaseService.setTokenToLocalstorage(res)
          })
          return true;
        }
        return false;
     }));
   }
  
}

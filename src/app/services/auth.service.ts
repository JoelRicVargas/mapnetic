import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ...omitted

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    ){

  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    let data = await this.afAuth.auth.signInWithPopup(provider);
    return data;
  }

  register(data): Observable<any> {
    return this.http.post<any>(environment.url+ "auth/register",data).pipe();
  }


  async facebookSignin(){
    const provider = new auth.FacebookAuthProvider();
    let data = await this.afAuth.auth.signInWithPopup(provider);
    return data;
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    // this.router.navigate(['/']);
  }

}

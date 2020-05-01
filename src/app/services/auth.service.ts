import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  // ...omitted

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    ){}

  setTokenToLocalstorage(token){
    if(!token) return
    localStorage.setItem("mapnaticToken",token);
  }

  getTokenLocalstorage(){
    return localStorage.getItem("mapnaticToken");
  }

  resetPassword(email){
    firebase.auth().sendPasswordResetEmail(email).then(res=>{
      console.log("Correo enviado exitosamente");
    }).catch(err=>{
      console.log("Error al enviar correo");
    });
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    let data = await this.afAuth.auth.signInWithPopup(provider);
    return data;
  }

  register(data): Observable<any> {
    return this.http.post<any>(environment.url+ "auth/register",data).pipe();
  }

  updateProfile(data): Observable<any> {
    return this.http.post<any>(environment.url+ "auth/updateProfile",data).pipe();
  }

  getAuth(data): Observable<any> {
    return this.http.post<any>(environment.url+ "auth/getAuth",data).pipe();
  }

  referedBy(data): Observable<any> {
    return this.http.post<any>(environment.url+ "auth/referedBy",data).pipe();
  }

  resendVerificationEmail(): Observable<any> {
    return this.http.get<any>(environment.url+ "resendVerificationEmail").pipe();
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

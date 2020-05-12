import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { StorageService } from './storage.service';
import { resolve } from 'dns';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  // ...omitted

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    private StorageService: StorageService,
  ) { }

  setTokenToLocalstorage(token) {
    if (!token) return
    localStorage.setItem("mapneticToken", token);
  }

  getTokenLocalstorage() {
    return localStorage.getItem("mapneticToken");
  }

  resetPassword(email) {
    firebase.auth().sendPasswordResetEmail(email).then(res => {
      console.log("Correo enviado exitosamente");
    }).catch(err => {
      console.log("Error al enviar correo");
    });
  }


  authWithCustomToken() {
    let authUser = firebase.auth().currentUser;
    if (!authUser && this.getTokenLocalstorage()) {
      firebase.auth().signInWithCustomToken(this.getTokenLocalstorage()).then(res => {
        console.log(res);
        this.getUserData();
      })
    }
  }


  singWithCustomToken() {
    //if(localStorage.getItem())
  }

  getUserData() {
    let data: any = {}
    let authUser = firebase.auth().currentUser;
    // if(authUser.displayName){
    //   let displayName = authUser.displayName.split(" ");
    //   if(displayName.length>1){
    //     data["nombres"]=displayName[0];
    //     data["apellidos"]=displayName[1];
    //   }
    // }
    return new Observable ((observable)=>{
      firebase.firestore().collection("users").doc(authUser.uid).onSnapshot(
        snapshot =>{
          authUser = JSON.parse(JSON.stringify(authUser));
          let dataFS = snapshot.data();
          dataFS.correo = authUser.email;
          if(authUser.emailVerified && !dataFS.emailVerified && dataFS.referedBy){
            snapshot.ref.set({emailVerified:true},{merge:true});
            this.updateRefersCount({referedBy:dataFS.referedBy});
          }
          if(!dataFS.photo && authUser.photoURL) dataFS.photo = authUser.photoURL; 
          // Object.keys(dataFS).map(key => {
          //   if (!data[key] && dataFS[key]) data[key] = dataFS[key];
          //   else if(["photo","cover","nombres","apellidos"].indexOf(key)!==-1 && dataFS[key]) data[key] = dataFS[key];
          // });
          this.StorageService.store("userMapnetic", dataFS);
          return observable.next(dataFS);
        }
      ) 
    })
    // get().then(res => {
    //   data.correo = authUser.email;
    //   let dataFS = res.data();
    //   data.photo = authUser.photoURL;
    //   Object.keys(dataFS).map(key => {
    //     if (!data[key] && dataFS[key]) data[key] = dataFS[key];
    //     else if(["photo","cover","nombres","apellidos"].indexOf(key)!==-1 && dataFS[key]) data[key] = dataFS[key];
    //   });
    //   this.StorageService.store("userMapnetic", data);
    //   return data;
    // });
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    let data = await this.afAuth.auth.signInWithPopup(provider);
    return data;
  }

  register(data): Observable<any> {
    return this.http.post<any>(environment.url + "auth/register", data).pipe();
  }

  updateProfile(data): Observable<any> {
    return this.http.post<any>(environment.url + "auth/updateProfile", data).pipe();
  }

  updateRefersCount(data): Observable<any> {
    return this.http.post<any>(environment.url+ "auth/updateRefersCount",data).pipe();
  }

  emailIsVerified(data): Observable<any> {
    return this.http.post<any>(environment.url+ "auth/emailIsVerified",data).pipe();
  }
  
  // updateUser(data): Observable<any> {
  //   return this.http.post<any>(environment.url + "auth/updateUser", data).pipe();
  // }


  getAuth(): Observable<any> {
    return this.http.get<any>(environment.url + "auth/getAuth").pipe();
  }

  verifyRefers(){
    let authUser = firebase.auth().currentUser;
    if(authUser){
      if(authUser.providerData.filter(x => x.providerId === "password").length>0){
        firebase.firestore().collection("users").doc(authUser.uid).get().then(res=>{
          if(res.exists){
            let data = null, referedBy = null;
            data = res.data();
            if(data){
              if(data.referedBy) this.updateRefersCount(data).subscribe(res=>{
                console.log("Usuario referido de : "+data.referedBy);
              });
            }
          }
        })
      }
    }
  }
  
  referedBy(data): Observable<any> {
    return this.http.post<any>(environment.url + "auth/referedBy", data).pipe();
  }

  resendVerificationEmail(): Observable<any> {
    return this.http.get<any>(environment.url + "resendVerificationEmail").pipe();
  }

  async facebookSignin() {
    const provider = new auth.FacebookAuthProvider();
    let data = await this.afAuth.auth.signInWithPopup(provider);
    return data;
  }

  async signOut() {
    //await this.afAuth.auth.signOut();
  }

}
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
    
    db = firebase.firestore();

    constructor(){}

    async getConfig(){
        let authUser = firebase.auth().currentUser;
        if (!authUser) return new Promise(resolve => {
            resolve({})
        });
        return this.db.collection("configuration").doc(authUser.uid).get().then(res=>{
            if(res.exists){
                return res.data();
            }
            return {};
        },err=>{
            console.log(err);
            return {};
        });
    }

    setConfig(data){
        let authUser = firebase .auth().currentUser;
        authUser = JSON.parse(JSON.stringify(authUser));
        return this.db.collection("configuration").doc(authUser.uid).set(data,{merge:true});
    }
}
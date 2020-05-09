import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthFirebaseService } from './services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mapnetic';
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore, private AuthFirebaseService : AuthFirebaseService ) {
    this.items = firestore.collection('items').valueChanges();
    // firebase.auth().onAuthStateChanged((user) => {
    //   if(user) this.AuthFirebaseService.getUserData();
    // });
  }
  
  
}

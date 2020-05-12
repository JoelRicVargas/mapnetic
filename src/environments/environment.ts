// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { BehaviorSubject } from 'rxjs';

export const environment = {
   url : "https://us-central1-mapnetinc-app.cloudfunctions.net/api/",
   firebase:{
     apiKey: "AIzaSyDYzwylfpXRB2MoBXEyW7XPwI6R2M_qztc",
     authDomain: "mapnetinc-app.firebaseapp.com",
     databaseURL: "https://mapnetinc-app.firebaseio.com",
     projectId: "mapnetinc-app",
     storageBucket: "mapnetinc-app.appspot.com",
     messagingSenderId: "771791152709",
     appId: "1:771791152709:web:e4d17ca24cad9b5543252c",
     measurementId: "G-MJMYHKXX54",
   },
  // url: "https://us-central1-mapnetic-b096b.cloudfunctions.net/api/",
  // firebase: {
  //   "apiKey": "AIzaSyBQuonUM8fK-FYKyTxdM7yM7dl_nyjEBCg",
  //   "authDomain": "mapnetic-b096b.firebaseapp.com",
  //   "databaseURL": "https://mapnetic-b096b.firebaseio.com",
  //   "projectId": "mapnetic-b096b",
  //   "storageBucket": "mapnetic-b096b.appspot.com",
  //   "messagingSenderId": "596624856836",
  //   "appId": "1:596624856836:web:be53ce1566edd0b561a251",
  //   "measurementId": "G-8M9HJ9RC9P"
  // }
};

export const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { BehaviorSubject } from 'rxjs';

export const environment = {
  production: false,

  firebase:{
    apiKey: "AIzaSyCEh3cKNt_hw0KnUXe17Hrrrxs6wdq7ppg",
    authDomain: "mapnetic-575d0.firebaseapp.com",
    databaseURL: "https://mapnetic-575d0.firebaseio.com",
    projectId: "mapnetic-575d0",
    storageBucket: "mapnetic-575d0.appspot.com",
    messagingSenderId: "837465815622",
    appId: "1:837465815622:web:71f51a5bbb4bdec7532847",
    measurementId: "G-YTPBKM1L75"
  }

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

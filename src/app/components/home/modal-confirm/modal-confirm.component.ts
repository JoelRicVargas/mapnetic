import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {

  @Input() question : String;
  constructor() { }

  ngOnInit(): void {
  }

  cerrar(){
    localStorage.removeItem("user");
    firebase.auth().signOut()
    .then(function () {
      console.log('saliendo...');
    })
    .catch(function (error) {
      console.log('error...');
    })

  }

}

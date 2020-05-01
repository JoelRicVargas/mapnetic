import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/service-auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  sendMailRecovery(f){
    this.authService.recuperarPassword(f.value.email);
  }

}

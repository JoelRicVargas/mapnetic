import { Component, OnInit } from '@angular/core';
import * as $ from 'Jquery';

@Component({
  selector: 'app-profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrls: ['./profile-banner.component.css']
})
export class ProfileBannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  edit_input(){
    $(".edit_input").css('pointer-events','visible');
    $(".edit_input").addClass('edit');
    $(".banner .overlayed").css('display','block');
  }
}

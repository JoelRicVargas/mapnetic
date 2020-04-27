import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { ProfileService } from 'src/app/services/service-profile.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  constructor(private profileService : ProfileService) { 
    this.profileService.obtener_usuario(this.registro);
  }

  registro : any = {
    nombres : '',
    apellidos : '',
    contrasena : '',
    correo : '',
    direccion : '',
    telefono : '',

    codigo_ref : '',
    plan_actual : '',
    cantidad_ref : '',
    dinero_generado : '',
    perfil_aprovado : false
  }
  
  ngOnInit(): void {
    $('#dismiss, .overlay').on('click', function () {
      $('#sidebar').removeClass('active');
      $('.overlay').fadeOut();
    });
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').fadeIn();
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  }

}

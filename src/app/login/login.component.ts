import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.models';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService


  ) { }

  ngOnInit() {
      init_plugins();
      this.email = localStorage.getItem('email') || '';
      if (this.email.length > 0) {
        this.recuerdame = true;
      }
    this.googleInit();

  }

  googleInit() {

      gapi.load('auth2', () => {

        this.auth2 = gapi.auth2.init({
          client_id: '165956016461-7d3rijcub8fc33oj19kgm874ac4uns2p.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });

        this.attachSignin(document.getElementById('btnGoogle'));
    });


  }

  attachSignin (element) {

    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle (token)
            .subscribe (correcto => window.location.href = '#/dashboard');

    });
  }



  ingresar (forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario (
      null,
      forma.value.email,
      forma.value.password
    );

    // Da igual lo que llegue (correcto) , habrá tenido exito la request, tan solo redireccionar.
    this._usuarioService.login (usuario, forma.value.recuerdame)
            .subscribe (correcto => this.router.navigate(['dashboard']));



  }

}

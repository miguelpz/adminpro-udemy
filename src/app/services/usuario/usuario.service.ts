import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs';






@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[];

  constructor(
    public http: HttpClient,
    public route: Router,
    public _subirArchivoServive: SubirArchivoService
  ) {
    this.cargarStorage();

  }

  estaLogueado () {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage () {



    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage (id: string, token: string, usuario: Usuario, menu: any) {

            localStorage.setItem ('id', id);
            localStorage.setItem ('token', token);
            localStorage.setItem ('usuario', JSON.stringify(usuario));
            localStorage.setItem ('menu', JSON.stringify(menu));


            this.usuario = usuario;
            this.token = token;
            this.menu = menu;



  }

  logout () {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.route.navigate(['/login']);


  }

  // Login Google

  loginGoogle (token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token})
        .map ((resp: any) => {
          console.log (resp);
          this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
          return true;

        });

  }

  // Login Normal

  login (usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post (url, usuario)
          .map ((resp: any) => {
            this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
          })
          .catch (err => {

            swal ('Error en el login', err.error.mensaje, 'error');
            return Observable.throw (err);
          });
  }


  crearUsuario (usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
        .map ((resp: any) => {

          swal('Usuario creado', usuario.email, 'success');
          return resp.usuario;
        })
        .catch (err => {

          swal (err.error.mensaje, err.error.errors.message, 'error');
          return Observable.throw (err);
        });

  }

  actualizarUsuario (usuario: Usuario) {


    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
          .map ((resp: any) => {

            if (this.usuario._id === usuario._id) {
              this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu );
            }
            swal ('Usuario actualizado', usuario.nombre, 'success');
            return true;
          })
          .catch (err => {

            swal (err.error.mensaje, err.error.errors.message, 'error');
            return Observable.throw (err);
          });


  }

  cambiarImagen ( archivo: File, id: string) {

    this._subirArchivoServive.subirArchivo(archivo, 'usuarios', id)
        .then ((resp: any) => {
          this.usuario.img = resp.usuario.img;
          swal ('Imagen Actualizada', this.usuario.nombre, 'success');
          this.guardarStorage (id, this.token, this.usuario, this.menu);
        })
        .catch (resp => {
          console.log (resp);
        });

  }

  // Mantenimientos

  cargarUsuarios (desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get (url);
  }

  buscarUsuarios (termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get (url)
          .map ((resp: any) => resp.usuarios);
  }

  borrarUsuario (id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    console.log (url);
    return this.http.delete(url)
          .map (resp => {
            swal ('Usuario borrado', 'El usuario ha sido eliminado de forma correcta', 'success');
            return true;
          });
  }





}

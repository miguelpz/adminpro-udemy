import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';



@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

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
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage (id: string, token: string, usuario: Usuario) {

            localStorage.setItem ('id', id);
            localStorage.setItem ('token', token);
            localStorage.setItem ('usuario', JSON.stringify(usuario));

            this.usuario = usuario;
            this.token = token;



  }

  logout () {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.route.navigate(['/login']);


  }

  // Login Google

  loginGoogle (token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token})
        .map ((resp: any) => {
          this.guardarStorage( resp.id, resp.token, resp.usuario);
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
            this.guardarStorage( resp.id, resp.token, resp.usuario);
          });
  }


  crearUsuario (usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
        .map ((resp: any) => {

          swal('Usuario creado', usuario.email, 'success');
          return resp.usuario;
        });

  }

  actualizarUsuario (usuario: Usuario) {


    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
          .map ((resp: any) => {

            if (this.usuario._id === usuario._id) {
              this.guardarStorage(resp.usuario._id, this.token, resp.usuario );
            }
            swal ('Usuario actualizado', usuario.nombre, 'success');
            return true;
          });


  }

  cambiarImagen ( archivo: File, id: string) {

    this._subirArchivoServive.subirArchivo(archivo, 'usuarios', id)
        .then ((resp: any) => {
          this.usuario.img = resp.usuario.img;
          swal ('Imagen Actualizada', this.usuario.nombre, 'success');
          this.guardarStorage (id, this.token, this.usuario);
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

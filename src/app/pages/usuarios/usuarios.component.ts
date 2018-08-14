import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component ({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})

export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean;


  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService

  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
          .subscribe(resp => this.cargarUsuarios());

  }

  mostrarModal (id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);

  }

  cargarUsuarios () {



    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
            .subscribe ((resp: any) => {

              this.totalRegistros = resp.total;
              this.usuarios = resp.usuarios;
              this.cargando = false;





            });


  }

  cambiarDesde (valor: number) {

    let desde = this.desde + valor;
    console.log (desde);

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario (termino: string) {

    if (termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
          .subscribe ((usuarios: Usuario[]) => {
            this.usuarios = usuarios;
            this.cargando = false;

          });
  }

  borrarUsuario (usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal ('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

   console.log (this.totalRegistros);

    swal({
      title: '¿Está seguro',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      console.log (borrar);

      if (borrar) {

        // Controlar que la paginación de tabla no quede vacía anticipándose al nuevo valor de usuarios del servicio.
        if (this.totalRegistros - 1 === this.desde && (this.totalRegistros - 1) >= 5 ) {
             this.desde -= 5;
        }

        this._usuarioService.borrarUsuario(usuario._id)
              .subscribe (borrado => {
                console.log (borrado);
               this.cargarUsuarios();
              });
      }

    });
  }

  guardarUsuario (usuario: Usuario) {
    this._usuarioService.actualizarUsuario (usuario)
            .subscribe();
  }
}

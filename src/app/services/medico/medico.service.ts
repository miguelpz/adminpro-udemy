import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;




  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }


  cargarMedico(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
        .map ((resp: any) => resp.medico);

  }


  cargarMedicos () {
    let url = URL_SERVICIOS + '/medico';

    return this.http.get (url)
        .map ((resp: any) => {
          this.totalMedicos = resp.total;
          return resp.medicos;
        });
  }

  // Mantenimientos

  buscarMedicos (termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get (url)
          .map ((resp: any) => resp.medicos);
  }

  borrarMedico ( id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
        .map ( resp => {

          swal ('Médico Borrado', 'Médico borrado correctamente', 'success');
          return resp;
        });
  }

  guardarMedico ( medico: Medico) {

    let url = URL_SERVICIOS + '/medico';
    if (medico._id) {
      // Actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put (url, medico)
                  .map ((resp: any) => {
                        swal ('Médico Actualiado', medico.nombre, 'success');
                        return resp.medico;
                  });
    } else {
      // Creando
          url += '?token=' + this._usuarioService.token;
          return this.http.post (url, medico)
                  .map ((resp: any) => {
                        swal ('Médico Creado', medico.nombre, 'success');
                        return resp.medico;
                  });
    }



  }
}

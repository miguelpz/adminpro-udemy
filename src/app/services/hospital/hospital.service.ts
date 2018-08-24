import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;



  constructor(
    public http: HttpClient,
    public route: Router,
    public _usuarioService: UsuarioService

  ) { }



  // Mantenimientos

  cargarHospitales () {

    let url = URL_SERVICIOS + '/hospital';
    return this.http.get (url)
        .map( (resp: any) => {
             this.totalHospitales = resp.total;

             return resp.hospitales;
        });
   }

  obtenerHospital (id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
     return this.http.get (url).map( (resp: any) => resp.hospital);
  }

  borrarHospital (id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' +  this._usuarioService.token;
      return this.http.delete (url).map (resp => {
            swal ('Hospital borrado', 'El hospital ha sido eliminado de forma correcta', 'success');
            return true;
      });
  }

  crearHospital (nombre: string) {



    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' +  this._usuarioService.token;
    return this.http.post(url, {nombre}).map((resp: any) => resp.hospital);






  }

  buscarHospital (termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get (url)
          .map ((resp: any) => resp.hospitales);
  }

  actualizarHospital(hospital: Hospital) {


    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
     url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
          .map ((resp: any) => resp.hospital);



  }

}

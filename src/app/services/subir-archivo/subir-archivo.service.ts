import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { XhrFactory } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo ( archivo: File, tipo: string, id: string) {

    return new Promise (( result, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest ();

      formData.append ('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
          if (xhr.status === 200) {
            console.log ('Imagen Subida');
            result (JSON.parse(xhr.response));
          } else {
            console.log ('Falló la subida');
            reject (xhr.response);
          }
        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send (formData);

    });
  }


}

import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;



  constructor(
    public _cargarArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {

   }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImage (archivo: File) { // Filtrado en el html
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal ('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTempo = reader.readAsDataURL (archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen () {
    console.log (this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id);
    this._cargarArchivoService.subirArchivo (this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
          .then (resp => {

            console.log (resp);
            this._modalUploadService.notificacion.emit (resp);
            this.cerrarModal();

          })
          .catch (err => {
            console.log ('Error en la carga...');

          });
  }


}

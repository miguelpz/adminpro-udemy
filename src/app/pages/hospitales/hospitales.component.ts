import { take } from 'rxjs/internal/operators';
import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { TouchSequence } from '../../../../node_modules/@types/selenium-webdriver';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

hospitales: Hospital[] = [];
cargando: boolean;




  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }



  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
    .subscribe(resp => this.cargarHospitales());



}

buscarHospital (termino: string) {

  if (termino.length <= 0 ) {
    this.cargarHospitales();
    return;
  }

   this.cargando = true;

  this._hospitalService.buscarHospital(termino)
        .subscribe ((hospitales: Hospital[]) => {
          this.hospitales = hospitales;
           this.cargando = false;

        });
}

  addHospital() {

    swal({
      title: 'Crear Hospital',
      content: 'input',
      text: 'Ingrese el nombre del hospital',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
      .then((value: string) => {
        if (value.length === 0 || !value ) {

          return;

        } else {

          this._hospitalService.crearHospital(value).subscribe(
            () => this.cargarHospitales()
          );
        }
      });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);

  }


cargarHospitales() {
  this.cargando = true;
  this._hospitalService.cargarHospitales()
        .subscribe(hospitales => {
          this.cargando = false;
          this.hospitales = hospitales;

});
}

guardarHospital (hospital: Hospital) {
  this._hospitalService.actualizarHospital(hospital)
      .subscribe((resp: any) => {
        swal ('Hospital Actualizado', 'Se ha actualizado a: ' + resp.nombre  , 'success');
      });



}

borrarHospital (hospital: Hospital) {



  swal({
    title: '¿Está seguro',
    text: 'Esta a punto de borrar a ' + hospital.nombre,
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
  .then((borrar) => {


    if (borrar) {


      this._hospitalService.borrarHospital(hospital._id)
            .subscribe (borrado => {

             this.cargarHospitales();
            });
    }

  });

}




}






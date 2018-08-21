import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/service.index';
import { HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare function init_plugins();

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];

  medico: Medico = new Medico('', '', '' , '', '');
  hospital: Hospital = new Hospital ('');


  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe ( params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarMedico(id);

      }

    });
   }

  ngOnInit() {
    init_plugins();
    this._hospitalService.cargarHospitales()
        .subscribe (hospitales => this.hospitales = hospitales);

        this.modalUploadService.notificacion
          .subscribe(resp => {
            this.medico.img = resp.medico.img;
          });






  }

  cargarMedico (id: string) {
    this._medicoService.cargarMedico(id)
          .subscribe (medico => {
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambiarHospital(this.medico.hospital);


          });
  }



  guardarMedico (f: NgForm) {

   console.log (f.valid);
   console.log (f.value);


    if (f.invalid) {
      return;
    }



    this._medicoService.guardarMedico(this.medico)
        .subscribe (medico => {

          this.medico._id = medico._id;
          console.log (this.medico);
          this.router.navigate(['/medico', medico._id]);




        });




  }

  cambiarHospital( id: string  ) {
    this._hospitalService.obtenerHospital(id)
        .subscribe (hospital => this.hospital = hospital);



  }

  cancelar () {
    this.router.navigate(['/medicos']);
    this.medico._id = '';
  }

  cambiarFoto () {

    this.modalUploadService.mostrarModal ('medicos', this.medico._id);

  }

}

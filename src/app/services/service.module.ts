import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';




import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  HospitalService,
  LoginGuardGuard,
  MedicoService
} from './service.index';





@NgModule({
  imports: [
    CommonModule,
    HttpClientModule

  ],
  providers: [
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  HospitalService,
  MedicoService,
  LoginGuardGuard,
  SubirArchivoService,
  ModalUploadComponent



  ],
  declarations: []
})
export class ServiceModule { }

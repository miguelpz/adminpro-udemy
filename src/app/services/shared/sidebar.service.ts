import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  // menu: any = [
  //   {
  //     titulo: 'Princial',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'ProgressBar', url: '/progress' },
  //       { titulo: 'Gráficas', url: '/graficas1' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'Rxjs', url: '/rxjs' }

  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url: '/usuarios'},
  //       {titulo: 'Hospitales', url: '/hospitales'},
  //       {titulo: 'Médidos', url: '/medicos'},
  //     ]
  //   }
  // ];




  constructor(public _usuarioService: UsuarioService) {



   }

   // Par forzar a este servicio a tener actualizado el menu cada vez que se inicializa sideber, ya que aquí solo lo haría al principio.
   cargarMenu () {
    this.menu = this._usuarioService.menu;


   }








}

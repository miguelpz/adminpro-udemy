import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor (public _usuarioService: UsuarioService) {}

  canActivate()  {

    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log ('BLOQUEADO POR EL ADMIN GUARD');
      this._usuarioService.logout();
      return false;
    }


  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.usuarioService.isAuth()) {
      this.router.navigate(['']);
      return false;
    }
    const userRole = this.usuarioService.getRole();
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        this.router.navigate(['']);
        return false;
      }
    return true;
  }
}

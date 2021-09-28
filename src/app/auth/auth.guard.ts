import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
      const url: string = state.url;
  
      return this.checkLogin(url);
  }
  
  checkLogin(url: string): true|UrlTree {
    if (sessionStorage.getItem('userUUID') != '') { return true; }

    // Store the attempted URL for redirecting
    this.usuarioService.redirectUrl = url;
    // Redirect to the login page
    return this.router.parseUrl('login');
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private usuarioService : UsuarioService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.usuarioService.isAuth()) {
      let idToken = this.usuarioService.getAuth();
      const cloned = request.clone({
          headers: request.headers.set("Authorization", "Bearer " + idToken)
      });
      return next.handle(cloned);
    }
    else {
        return next.handle(request);
    }
  }
}

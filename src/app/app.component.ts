import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './services/usuario.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  
  isAuthenticated = false;
  user = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngDoCheck(): void {
    let token : string = this.usuarioService.getAuth();
    if (token) {
         let decoded : any = jwt_decode(token);
         let current_time = new Date().getTime() / 1000;
         if (current_time > decoded.exp) { alert('Debe iniciar sesión nuevamente.'); this.logout(); }
    }
  }

  ngOnInit(): void {
    if (this.usuarioService.isAuth()) {
      this.isAuthenticated = true;
      this.user = this.usuarioService.getUser();
    }
  }

  logout(){
    this.usuarioService.setAuth('');
    this.usuarioService.setUser('');
    this.router.navigate(['']);
    window.location.reload();
  }

  actionSidebar(){
    document.getElementById("sidebar").classList.toggle('active');
  }
}
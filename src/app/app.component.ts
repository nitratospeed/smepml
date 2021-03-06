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
  role = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngDoCheck(): void {
    let token : string = this.usuarioService.getAuth();
    if (token) {
         let decoded : any = jwt_decode(token);
         let current_time = new Date().getTime() / 1000;
         if (current_time > decoded?.exp ?? 0) { alert('Debe iniciar sesión nuevamente.'); this.logout(); }         
    }
  }

  ngOnInit(): void {
    if (this.usuarioService.isAuth()) {
      this.isAuthenticated = true;
      this.user = this.usuarioService.getUser();
      this.role = this.usuarioService.getRole();
    }
  }

  logout(){
    this.usuarioService.setAuth('');
    this.usuarioService.setUser('');
    this.usuarioService.setRole('');
    this.usuarioService.setUsername('');
    this.router.navigate(['']);
    window.location.reload();
  }

  changeSidebarSize(){
    if (document.getElementById('collapseWidthExample').classList.contains('col-2')) {
        document.getElementById('collapseWidthExample').classList.replace('col-2', 'col-1');
        document.getElementById('content').classList.replace('col-sm-10', 'col-sm-11');
    }
    else {
        document.getElementById('collapseWidthExample').classList.replace('col-1', 'col-2');
        document.getElementById('content').classList.replace('col-sm-11', 'col-sm-10');
    }
  }
}
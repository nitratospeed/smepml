import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isAuthenticated = false;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    if (this.usuarioService.isAuth()) {
      this.isAuthenticated = true;
    }
  }

  logout(){
    this.usuarioService.logout();
    this.router.navigate(['']);
    window.location.reload();
  }

  actionSidebar(){
    document.getElementById("sidebar").classList.toggle('active');
  }
}
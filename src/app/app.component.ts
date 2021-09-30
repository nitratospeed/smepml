import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  faTachometerAlt,
   faHospitalUser,
    faChevronLeft,
     faUsers,
      faUserPlus,
       faStethoscope,
      faDiagnoses,
    faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  faTachometerAlt = faTachometerAlt;
  faHospitalUser = faHospitalUser;
  faChevronLeft = faChevronLeft;
  faUsers = faUsers;
  faUserPlus = faUserPlus;
  faStethoscope = faStethoscope;
  faDiagnoses = faDiagnoses;
  faNotesMedical = faNotesMedical;

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
}
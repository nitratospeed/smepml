import { Component, OnInit } from '@angular/core';
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

  //isLoggedIn = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    //this.isLoggedIn = this.usuarioService.isLoggedIn;
  }

  logout(){
    this.usuarioService.logout();
  }
}
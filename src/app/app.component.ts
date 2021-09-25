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

  isLoggedIn = '';

  constructor() { }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') ?? '';
  }
}
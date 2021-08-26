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
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  faTachometerAlt = faTachometerAlt;
  faHospitalUser = faHospitalUser;
  faChevronLeft = faChevronLeft;
  faUsers = faUsers;
  faUserPlus = faUserPlus;
  faStethoscope = faStethoscope;
  faDiagnoses = faDiagnoses;
  faNotesMedical = faNotesMedical;

  constructor() { }

  ngOnInit(): void {
  }

}

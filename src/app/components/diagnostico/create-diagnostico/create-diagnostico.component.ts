import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-diagnostico',
  templateUrl: './create-diagnostico.component.html',
  styleUrls: ['./create-diagnostico.component.scss']
})
export class CreateDiagnosticoComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}

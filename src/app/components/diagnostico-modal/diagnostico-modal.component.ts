import { Component, OnInit } from '@angular/core';
import { Sintomas } from 'src/app/models/sintomas';

@Component({
  selector: 'app-diagnostico-modal',
  templateUrl: './diagnostico-modal.component.html',
  styleUrls: ['./diagnostico-modal.component.scss']
})
export class DiagnosticoModalComponent implements OnInit {

  public bodyPart: number;
  public ListaTotal : Sintomas[];

  public ListaFiltrada: Sintomas[];

  constructor() { }

  ngOnInit(): void {
    this.ListaFiltrada = this.ListaTotal.filter(x=>x.zonaId == this.bodyPart);
    console.log(this.ListaFiltrada);
  }

}

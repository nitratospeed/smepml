import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from "src/app/services/diagnostico.service";
import { Base } from "src/app/models/base";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sintomas: any[]= [];
  enfermedades: any[]= [];

  view: any[] = [500, 500];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  legendTitleSintomas: string = 'Top de Síntomas';
  legendTitleEnfermedades: string = 'Top de Enfermedades';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private readonly diagnosticoService : DiagnosticoService) { 
  }

  ngOnInit(): void {
    this.getReport(1)
    this.getReport(2)
  }

  getReport(tipoReporte:number) {
    let params = {
      "tipoReporte": tipoReporte
    }

    this.diagnosticoService.report(params).subscribe((result : Base<any>) => 
    {
      if (result.isSuccess) 
      {
        if (tipoReporte == 1) {
          this.enfermedades = result.data; 
        }
        if (tipoReporte == 2) {
          this.sintomas = result.data; 
        }
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }

  onSelect(data): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}

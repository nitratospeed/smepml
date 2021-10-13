import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from "src/app/services/diagnostico.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { PacienteService } from "src/app/services/paciente.service";
import { Base } from "src/app/models/base";
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sintomas: any[]= [];
  enfermedades: any[]= [];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Síntomas';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';

  usuariosCount : number = 0;
  pacientesCount : number = 0;
  diagnosticosCount : number = 0;

  constructor(private readonly diagnosticoService : DiagnosticoService,
    private readonly usuarioService : UsuarioService,
    private readonly pacienteService : PacienteService) { 
  }

  ngOnInit(): void {
    this.getReport(1);
    this.getReport(2);
    this.getCountUsuarios();
    this.getCountPacientes();
    this.getCountDiagnosticos();
  }

  getReport(tipoReporte:number) {
    let params = {
      "tipoReporte": tipoReporte
    }

    this.diagnosticoService.report(params).subscribe((result : Base<string[]>) => 
    {
      if (result.isSuccess) 
      {
        if (tipoReporte == 1) {
          this.enfermedades = result.data.splice(0, 15); 
        }
        if (tipoReporte == 2) {
          this.sintomas = result.data.splice(0, 15); 
        }
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }

  getCountUsuarios(){

    let params = {
      "Perfil": 2
    }

    this.usuarioService.get(params).subscribe((result : Base<Pagination<any>>) => 
    {
      if (result.isSuccess) 
      {
        this.usuariosCount = result.data.totalCount;
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego.")) 
  }

  getCountPacientes(){
    this.pacienteService.get(null).subscribe((result : Base<Pagination<any>>) => 
    {
      if (result.isSuccess) 
      {
        this.pacientesCount = result.data.totalCount;
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego.")) 
  }

  getCountDiagnosticos(){
    this.diagnosticoService.get(null).subscribe((result : Base<Pagination<any>>) => 
    {
      if (result.isSuccess) 
      {
        this.diagnosticosCount = result.data.totalCount;
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

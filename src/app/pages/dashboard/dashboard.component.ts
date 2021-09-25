import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from "src/app/services/diagnostico.service";
import { Base } from "src/app/models/base";
import { Pagination } from "src/app/models/pagination";
import { Diagnostico } from "src/app/models/diagnostico";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Diagnosticos : Diagnostico[];

  sintomas: any[] = []

  single: any[]= [];

  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private readonly diagnosticoService : DiagnosticoService) { 
  }

  ngOnInit(): void {
    this.getDiagnosticos(1)
  }

  getDiagnosticos(currentIndex:number) {
      this.diagnosticoService.get({"PageNumber": currentIndex, "PageSize": 99}).subscribe((result : Base<Pagination<Diagnostico>>) => 
      {
        if (result.isSuccess) 
        {
          this.Diagnosticos = result.data.items;
          this.Diagnosticos.forEach(element => {
            let sintx : any[] = []
           
            element.sintomas.split(',').forEach(sint => {
              let i = 1;

              sintx.push({
                "name": sint,
                "value": i,
              })

              i++;
            });         
            this.sintomas.push({
              "name": element.resultadoMasPreciso.toString(),
              "series": sintx
            })
          });

          this.single = this.sintomas;

          console.log(this.single)
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

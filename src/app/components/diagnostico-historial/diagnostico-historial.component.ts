import { Component, OnInit } from '@angular/core';
import { PrediccionService } from "src/app/services/prediccion.service";
import { Diagnosticos } from "src/app/models/diagnosticos";

@Component({
  selector: 'app-diagnostico-historial',
  templateUrl: './diagnostico-historial.component.html',
  styleUrls: ['./diagnostico-historial.component.scss']
})
export class DiagnosticoHistorialComponent implements OnInit {

  Diagnosticos : Diagnosticos[];

  constructor(private readonly prediccionService : PrediccionService) { }

  ngOnInit(): void {
    this.getDiagnosticosFromService();
  }

  getDiagnosticosFromService(){
    this.prediccionService.get().subscribe((rest : any) => {
      if (rest.isSuccess) {
        this.Diagnosticos = rest.data
      }
      else {
        alert("Ocurrió un error.");
      }
    }, Error => alert("Ocurrió un error."))
  }
}

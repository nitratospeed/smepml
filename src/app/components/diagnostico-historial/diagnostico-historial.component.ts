import { Component, OnInit } from '@angular/core';
import { PrediccionService } from "src/app/services/prediccion.service";
import { Diagnosticos } from "src/app/models/diagnosticos";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-diagnostico-historial',
  templateUrl: './diagnostico-historial.component.html',
  styleUrls: ['./diagnostico-historial.component.scss']
})
export class DiagnosticoHistorialComponent implements OnInit {

  closeResult = '';

  Diagnosticos : Diagnosticos[];

  DiagnosticoId : number = 0;
  DiagnosticoNombres : string = "";
  DiagnosticoEdad : number = 0;
  DiagnosticoGenero : string = "";
  DiagnosticoSintomas : string = "";
  DiagnosticoResultado : string = "";

  constructor(private readonly prediccionService : PrediccionService, private modalService: NgbModal) { }

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

  open(content, diagnosticoId) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.DiagnosticoId = diagnosticoId;
    let diag = this.Diagnosticos.find(x=>x.id == this.DiagnosticoId);
    this.DiagnosticoNombres = diag.nombres;
    this.DiagnosticoEdad = diag.edad;
    this.DiagnosticoGenero = diag.genero;
    this.DiagnosticoSintomas = diag.sintomas;
    this.DiagnosticoResultado = diag.resultadoMasPreciso;
  }
}

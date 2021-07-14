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

  PageIndex : number = 0;
  TotalPages : number = 0;
  TotalCount : number = 0;
  HasPreviousPage : boolean = false;
  HasNextPage : boolean = true;

  constructor(private readonly prediccionService : PrediccionService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getDiagnosticosFromService(1);
  }

  getDiagnosticosFromService(currentIndex:number){

    if (
      currentIndex > 0 &&
       ((this.TotalPages > 0 && currentIndex <= this.TotalPages) ||
       (this.TotalPages == 0))
       ) {
      this.prediccionService.get({"PageNumber": currentIndex, "PageSize": 5}).subscribe((rest : any) => {
        if (rest.isSuccess) {
          this.Diagnosticos = rest.data.items;
          this.PageIndex = rest.data.pageIndex;
          this.TotalPages = rest.data.totalPages;
          this.HasPreviousPage = rest.data.hasPreviousPage;
          this.HasNextPage = rest.data.hasNextPage;
        }
        else {
          alert("Ocurrió un error.");
        }
      }, Error => alert("Ocurrió un error.")) 
    }
  }

  open(content, diagnosticoId) {
    this.modalService.open(content, { size: 'lg' });
    this.DiagnosticoId = diagnosticoId;
    let diag = this.Diagnosticos.find(x=>x.id == this.DiagnosticoId);
    this.DiagnosticoNombres = diag.nombres;
    this.DiagnosticoEdad = diag.edad;
    this.DiagnosticoGenero = diag.genero;
    this.DiagnosticoSintomas = diag.sintomas;
    this.DiagnosticoResultado = diag.resultadoMasPreciso;
  }
}

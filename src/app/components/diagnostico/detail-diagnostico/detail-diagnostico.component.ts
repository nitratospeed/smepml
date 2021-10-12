import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DiagnosticoService } from "src/app/services/diagnostico.service";
import { Base } from 'src/app/models/base';
import { Diagnostico } from 'src/app/models/diagnostico';
import { EnfermedadService } from 'src/app/services/enfermedad.service';
import { Enfermedad } from 'src/app/models/enfermedad';

@Component({
  selector: 'app-detail-diagnostico',
  templateUrl: './detail-diagnostico.component.html',
  styleUrls: ['./detail-diagnostico.component.scss']
})
export class DetailDiagnosticoComponent implements OnInit {

  @Input() id;

  recomendaciones : string = '';

  examenes : string[] = [];

  currentRate = 0;

  diagnostico = {paciente : {}} as Diagnostico;

  constructor(public activeModal: NgbActiveModal, private readonly diagnosticoService : DiagnosticoService
    , private readonly enfermedadService : EnfermedadService) { }

  ngOnInit(): void {
    this.diagnosticoService.getById(this.id).subscribe((result : Base<Diagnostico>) => 
    {
      if (result.isSuccess) 
      {
        this.diagnostico = result.data;
        this.currentRate = this.diagnostico.calificacion;
        this.getEnfRecomExam();
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }

  getEnfRecomExam(){
    let enfermedad = this.diagnostico.resultadoMasPreciso;
    this.enfermedadService.getByName(enfermedad).subscribe((result : Base<Enfermedad>) => 
    {
      if (result.isSuccess) 
      {
        this.recomendaciones = result.data.recomendacion;
        this.examenes = result.data.examenes;
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))  
  }

  emailDiagnostico(){
    this.diagnosticoService.email(this.id).subscribe((result : Base<boolean>) => 
    {
      if (result.isSuccess) 
      {
        alert("Se envió el correo exitosamente.");
        this.activeModal.close(true);
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }

  pdfDiagnostico(){
    let params = {
      "id": this.id
    }
    this.diagnosticoService.pdf(params).subscribe((result : any) => 
    {
      let dataType = result.type;
      let binaryData = [];
      binaryData.push(result);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      downloadLink.setAttribute('download', "report.pdf");
      document.body.appendChild(downloadLink);
      downloadLink.click();
      alert("Se generó el reporte pdf exitosamente.");
      this.activeModal.close(true);
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }

  ratingDiagnostico(){
    this.diagnosticoService.rating(
      { "id": this.id,
        "calificacion": this.currentRate }
    ).subscribe((result : Base<boolean>) => 
    {
      if (result.isSuccess) 
      {
        alert("Calificado con éxito.");
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { DiagnosticoService } from "src/app/services/diagnostico.service";
import { Base } from 'src/app/models/base';
import { Diagnostico } from 'src/app/models/diagnostico';

@Component({
  selector: 'app-detail-diagnostico',
  templateUrl: './detail-diagnostico.component.html',
  styleUrls: ['./detail-diagnostico.component.scss']
})
export class DetailDiagnosticoComponent implements OnInit {

  @Input() id;

  currentRate = 0;

  diagnostico = {paciente : {}} as Diagnostico;

  constructor(public activeModal: NgbActiveModal, private readonly diagnosticoService : DiagnosticoService) { }

  ngOnInit(): void {
    this.diagnosticoService.getById(this.id).subscribe((result : Base<Diagnostico>) => 
    {
      if (result.isSuccess) 
      {
        this.diagnostico = result.data;
        this.currentRate = this.diagnostico.calificacion;
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

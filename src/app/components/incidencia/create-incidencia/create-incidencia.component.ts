import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { IncidenciaService } from "src/app/services/incidencia.service";
import { Base } from 'src/app/models/base';
import { Incidencia } from 'src/app/models/incidencia';

@Component({
  selector: 'app-create-incidencia',
  templateUrl: './create-incidencia.component.html',
  styleUrls: ['./create-incidencia.component.scss']
})
export class CreateIncidenciaComponent implements OnInit {

  incidencia : Incidencia;

  adjuntoX : any;

  incidenciaForm = new FormGroup({
    urgencia: new FormControl(''),
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    adjuntoUrl: new FormControl(''),
    estado: new FormControl(''),
  });

  constructor(public activeModal: NgbActiveModal, private readonly incidenciaService : IncidenciaService) { }

  ngOnInit(): void {
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.adjuntoX = event.target.files[0];
    }

    console.log(this.adjuntoX)
  }

  createIncidencia(){

    let params = {
      "titulo": this.incidenciaForm.value['titulo'], 
      "descripcion": this.incidenciaForm.value['descripcion'], 
      "urgencia": this.incidenciaForm.value['urgencia'], 
      "estado": "Abierto", 
    }

    const formData = new FormData();
    formData.append('adjuntoUrl', this.adjuntoX);

    this.incidenciaService.post(params, formData).subscribe((result : Base<number>) => 
    {
      if (result.isSuccess) 
      {
        alert("Guardado con éxito.");
        this.activeModal.close(true);
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }
}

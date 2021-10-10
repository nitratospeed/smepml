import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { IncidenciaService } from "src/app/services/incidencia.service";
import { Base } from 'src/app/models/base';
import { Incidencia } from 'src/app/models/incidencia';

@Component({
  selector: 'app-update-incidencia',
  templateUrl: './update-incidencia.component.html',
  styleUrls: ['./update-incidencia.component.scss']
})
export class UpdateIncidenciaComponent implements OnInit {

  @Input() id;

  incidencia : Incidencia;

  incidenciaForm = new FormGroup({
    id: new FormControl(0),
    urgencia: new FormControl(''),
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    adjuntoUrl: new FormControl(''),
    estado: new FormControl(''),
  });

  constructor(public activeModal: NgbActiveModal, private readonly incidenciaService : IncidenciaService) { }

  ngOnInit(): void {
    this.incidenciaService.getById(this.id).subscribe((result : Base<Incidencia>) => 
    {
      if (result.isSuccess) 
      {
        this.incidencia = result.data;
        this.incidenciaForm.setValue(this.incidencia);
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }

  updateIncidencia(){
    this.incidencia = this.incidenciaForm.value;

    this.incidenciaService.put(this.id, this.incidencia).subscribe((result : Base<number>) => 
    {
      if (result.isSuccess) 
      {
        alert("Actualizado con éxito.");
        this.activeModal.close(true)
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }

}

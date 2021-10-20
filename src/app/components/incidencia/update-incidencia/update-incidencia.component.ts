import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { IncidenciaService } from "src/app/services/incidencia.service";
import { Base } from 'src/app/models/base';
import { Incidencia } from 'src/app/models/incidencia';
import { Seguimiento } from 'src/app/models/incidencia';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-update-incidencia',
  templateUrl: './update-incidencia.component.html',
  styleUrls: ['./update-incidencia.component.scss']
})
export class UpdateIncidenciaComponent implements OnInit {

  @Input() id;

  perfil = '';

  seguimiento : Seguimiento = ({} as any);

  incidencia : Incidencia;

  incidenciaForm = new FormGroup({
    id: new FormControl(0),
    urgencia: new FormControl(''),
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    adjuntoUrl: new FormControl(''),
    estado: new FormControl(''),
    seguimientos: new FormGroup({
      id: new FormControl(0),
      descripcion: new FormControl(''),
      incidenciaId : new FormControl(0)
    })
  });

  constructor(public activeModal: NgbActiveModal, private readonly incidenciaService : IncidenciaService,
    private readonly usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.incidenciaService.getById(this.id).subscribe((result : Base<Incidencia>) => 
    {
      if (result.isSuccess) 
      {
        this.incidencia = result.data;
        this.perfil = this.usuarioService.getRole();
        this.incidenciaForm.setValue(this.incidencia);
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }

  updateIncidencia(){
    this.incidencia.id = this.incidenciaForm.value['id'];
    this.incidencia.titulo = this.incidenciaForm.value['titulo'];
    this.incidencia.urgencia = this.incidenciaForm.value['urgencia'];
    this.incidencia.estado = this.incidenciaForm.value['estado'];
    this.incidencia.descripcion = this.incidenciaForm.value['descripcion'];
    this.incidencia.adjuntoUrl = this.incidenciaForm.value['adjuntoUrl'];

    if (this.perfil == 'Administrador') {
      this.seguimiento.id = 0;
      this.seguimiento.incidenciaId = 0;
      this.seguimiento.descripcion = this.incidenciaForm.value['seguimientos']['descripcion'];
      this.incidencia.seguimientos.push(this.seguimiento) 
    }

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

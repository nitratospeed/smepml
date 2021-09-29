import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { PacienteService } from "src/app/services/paciente.service";
import { Base } from 'src/app/models/base';
import { Paciente } from 'src/app/models/paciente';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-update-paciente',
  templateUrl: './update-paciente.component.html',
  styleUrls: ['./update-paciente.component.scss']
})
export class UpdatePacienteComponent implements OnInit {

  @Input() id;

  paciente : Paciente;

  pacienteForm = new FormGroup({
    id: new FormControl(0),
    apellidos: new FormControl(''),
    nombres: new FormControl(''),
    dni: new FormControl(''),
    celular: new FormControl(''),
    fechaNacimiento: new FormControl(),
    correo: new FormControl(''),
    direccion: new FormControl(''),
    edad: new FormControl(0),
    genero: new FormControl(''),
  });

  constructor(public activeModal: NgbActiveModal, private readonly pacienteService : PacienteService) { }

  ngOnInit(): void {
    this.pacienteService.getById(this.id).subscribe((result : Base<Paciente>) => 
    {
      if (result.isSuccess) 
      {
        this.pacienteForm.patchValue({
          id: result.data.id,
          apellidos: result.data.apellidos,
          nombres: result.data.nombres,
          dni: result.data.dni,
          celular: result.data.celular,
          fechaNacimiento: formatDate(result.data.fechaNacimiento,'yyyy-MM-dd','en'),
          correo: result.data.correo,
          direccion: result.data.direccion,
          edad: result.data.edad,
          genero: result.data.genero
        })
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }

  updatePaciente(){
    
    this.paciente = this.pacienteForm.value;
    this.paciente.fechaNacimiento = new Date(this.pacienteForm.value['fechaNacimiento']);
    this.paciente.edad = Number.parseInt(this.pacienteForm.value['edad']);

    this.pacienteService.put(this.id, this.paciente).subscribe((result : Base<number>) => 
    {
      if (result.isSuccess) 
      {
        alert("Actualizado con éxito.");
        this.activeModal.close('Success click')
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }

  calcEdad(event){
    let currentYear = new Date().getFullYear();
    let birthdayYear = new Date(event.target.value).getFullYear();

    let age = currentYear - birthdayYear ?? 0;

    this.pacienteForm.patchValue({
      edad: age
    })
  }
}

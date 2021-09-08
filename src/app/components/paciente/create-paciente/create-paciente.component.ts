import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { PacienteService } from "src/app/services/paciente.service";
import { Base } from 'src/app/models/base';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-create-paciente',
  templateUrl: './create-paciente.component.html',
  styleUrls: ['./create-paciente.component.scss']
})
export class CreatePacienteComponent implements OnInit {

  paciente : Paciente;

  pacienteForm = new FormGroup({
    apellidos: new FormControl(''),
    nombres: new FormControl(''),
    dni: new FormControl(''),
    celular: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    correo: new FormControl(''),
    direccion: new FormControl(''),
    edad: new FormControl(0),
    genero: new FormControl(''),
  });

  constructor(public activeModal: NgbActiveModal, private readonly pacienteService : PacienteService) { }

  ngOnInit(): void {
  }

  createPaciente(){
    
    this.paciente = this.pacienteForm.value;
    this.paciente.fechaNacimiento = new Date(this.pacienteForm.value['fechaNacimiento']);
    this.paciente.edad = Number.parseInt(this.pacienteForm.value['edad']);

    this.pacienteService.post(this.paciente).subscribe((result : Base<number>) => 
    {
      if (result.isSuccess) 
      {
        alert("Guardado con éxito.");
        this.activeModal.close('Success click')
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }
}

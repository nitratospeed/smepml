import { Component, OnInit } from '@angular/core';
import { PacienteService } from "src/app/services/paciente.service";
import { Base } from "src/app/models/base";
import { Pagination } from "src/app/models/pagination";
import { Paciente } from "src/app/models/paciente";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePacienteComponent } from 'src/app/components/paciente/create-paciente/create-paciente.component';
import { UpdatePacienteComponent } from 'src/app/components/paciente/update-paciente/update-paciente.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  Pacientes : Paciente[];

  pacienteForm = new FormGroup({
    nombres: new FormControl(''),
    dni: new FormControl(''),
  });

  Pagination : Pagination<Paciente> = new Pagination<Paciente>();

  constructor(private readonly pacienteService : PacienteService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPacientes(1);
  }

  getPacientes(currentIndex:number) {
    if (currentIndex > 0 && ((this.Pagination.totalPages > 0 && currentIndex <= this.Pagination.totalPages) || (this.Pagination.totalPages == 0)))
    {
      let params = {
        "PageNumber": currentIndex, 
        "PageSize": 5,
        "Nombres": this.pacienteForm.value['nombres'] ?? '',
        "Dni": this.pacienteForm.value['dni'] ?? ''
      }

      this.pacienteService.get(params).subscribe((result : Base<Pagination<Paciente>>) => 
      {
        if (result.isSuccess) 
        {
          this.Pacientes = result.data.items;
          this.Pagination = result.data;
        }
        else 
        {
          alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
        }
      }, Error => alert("Error en servicio interno. Favor intentar luego.")) 
    }
  }

  createPaciente(){
    const modalRef = this.modalService.open(CreatePacienteComponent, {scrollable: true, size: 'lg'});
    modalRef.result.then((result) => {
      if (result==true) {
        this.getPacientes(1); 
      }
    });
  }

  updatePaciente(id:number){
    const modalRef = this.modalService.open(UpdatePacienteComponent, {scrollable: true, size: 'lg'});
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result==true) {
        this.getPacientes(1); 
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from "src/app/services/incidencia.service";
import { Base } from "src/app/models/base";
import { Pagination } from "src/app/models/pagination";
import { Incidencia } from "src/app/models/incidencia";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateIncidenciaComponent } from 'src/app/components/incidencia/create-incidencia/create-incidencia.component';
import { UpdateIncidenciaComponent } from 'src/app/components/incidencia/update-incidencia/update-incidencia.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.scss']
})
export class IncidenciaComponent implements OnInit {

  role = '';

  incidenciaForm = new FormGroup({
    titulo: new FormControl(''),
    username: new FormControl(''),
    urgencia: new FormControl(''),
  });

  incidencias : Incidencia[];
  Pagination : Pagination<Incidencia> = new Pagination<Incidencia>();

  constructor(private readonly incidenciaService : IncidenciaService, private modalService: NgbModal,
    private readonly usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.getIncidencias(1);
    this.role = this.usuarioService.getRole();
  }

  getIncidencias(currentIndex:number) {
    if (currentIndex > 0 && ((this.Pagination.totalPages > 0 && currentIndex <= this.Pagination.totalPages) || (this.Pagination.totalPages == 0)))
    {
      let params = {
        "PageNumber": currentIndex, 
        "PageSize": 5,
        "Username": this.usuarioService.getRole() == "Medico" ? this.usuarioService.getUsername() : this.incidenciaForm.value['username'],
        "Titulo" : this.incidenciaForm.value['titulo'],
        "Urgencia" : this.incidenciaForm.value['urgencia'],
      }

      this.incidenciaService.get(params).subscribe((result : Base<Pagination<Incidencia>>) => 
      {
        if (result.isSuccess) 
        {
          this.incidencias = result.data.items;
          this.Pagination = result.data;
        }
        else 
        {
          alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
        }
      }, Error => alert("Error en servicio interno. Favor intentar luego.")) 
    }
  }

  createIncidencia(){
    const modalRef = this.modalService.open(CreateIncidenciaComponent, {scrollable: true, size: 'lg'});
    modalRef.result.then((result) => {
      if (result==true) {
        this.getIncidencias(1); 
      }
    });
  }

  updateIncidencia(id:number){
    const modalRef = this.modalService.open(UpdateIncidenciaComponent, {scrollable: true, size: 'lg'});
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result==true) {
        this.getIncidencias(1); 
      }
    });
  }
}

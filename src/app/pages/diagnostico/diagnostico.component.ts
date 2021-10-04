import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from "src/app/services/diagnostico.service";
import { Base } from "src/app/models/base";
import { Pagination } from "src/app/models/pagination";
import { Diagnostico } from "src/app/models/diagnostico";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateDiagnosticoComponent } from 'src/app/components/diagnostico/create-diagnostico/create-diagnostico.component';
import { DetailDiagnosticoComponent } from 'src/app/components/diagnostico/detail-diagnostico/detail-diagnostico.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent implements OnInit {

  Diagnosticos : Diagnostico[];

  diagnosticoForm = new FormGroup({
    nombres: new FormControl(''),
    dni: new FormControl(''),
  });

  Pagination : Pagination<Diagnostico> = new Pagination<Diagnostico>();

  constructor(private readonly diagnosticoService : DiagnosticoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getDiagnosticos(1);
  }

  getDiagnosticos(currentIndex:number) {
    if (currentIndex > 0 && ((this.Pagination.totalPages > 0 && currentIndex <= this.Pagination.totalPages) || (this.Pagination.totalPages == 0)))
    {
      let params = {
        "PageNumber": currentIndex, 
        "PageSize": 5,
        "Nombres": this.diagnosticoForm.value['nombres'] ?? '',
        "Dni": this.diagnosticoForm.value['dni'] ?? ''
      }

      this.diagnosticoService.get(params).subscribe((result : Base<Pagination<Diagnostico>>) => 
      {
        if (result.isSuccess) 
        {
          this.Diagnosticos = result.data.items;
          this.Pagination = result.data;
        }
        else 
        {
          alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
        }
      }, Error => alert("Error en servicio interno. Favor intentar luego.")) 
    }
  }

  createDiagnostico(){
    this.modalService.open(CreateDiagnosticoComponent, { size: 'lg', scrollable: true });
  }

  detailDiagnostico(id:number){
    const modalRef = this.modalService.open(DetailDiagnosticoComponent, {scrollable: true});
    modalRef.componentInstance.id = id;
  }
}

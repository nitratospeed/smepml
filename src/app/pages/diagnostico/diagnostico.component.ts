import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from "src/app/services/diagnostico.service";
import { Base } from "src/app/models/base";
import { Pagination } from "src/app/models/pagination";
import { Diagnostico } from "src/app/models/diagnostico";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateDiagnosticoComponent } from 'src/app/components/diagnostico/create-diagnostico/create-diagnostico.component';
import { DetailDiagnosticoComponent } from 'src/app/components/diagnostico/detail-diagnostico/detail-diagnostico.component';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent implements OnInit {

  Diagnosticos : Diagnostico[];
  Pagination : Pagination<Diagnostico> = new Pagination<Diagnostico>();

  constructor(private readonly diagnosticoService : DiagnosticoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getDiagnosticos(1);
  }

  getDiagnosticos(currentIndex:number) {
    if (currentIndex > 0 && ((this.Pagination.totalPages > 0 && currentIndex <= this.Pagination.totalPages) || (this.Pagination.totalPages == 0)))
    {
      this.diagnosticoService.get({"PageNumber": currentIndex, "PageSize": 5}).subscribe((result : Base<Pagination<Diagnostico>>) => 
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
    this.modalService.open(CreateDiagnosticoComponent, { size: 'lg' });
  }

  detailDiagnostico(id:number){
    const modalRef = this.modalService.open(DetailDiagnosticoComponent);
    modalRef.componentInstance.id = id;
  }
}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "src/app/services/usuario.service";
import { Base } from "src/app/models/base";
import { Pagination } from "src/app/models/pagination";
import { Usuario } from "src/app/models/usuario";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUsuarioComponent } from 'src/app/components/usuario/create-usuario/create-usuario.component';
import { UpdateUsuarioComponent } from 'src/app/components/usuario/update-usuario/update-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  Usuarios : Usuario[];
  Pagination : Pagination<Usuario> = new Pagination<Usuario>();

  constructor(private readonly usuarioService : UsuarioService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getUsuarios(1);
  }

  getUsuarios(currentIndex:number) {
    if (currentIndex > 0 && ((this.Pagination.totalPages > 0 && currentIndex <= this.Pagination.totalPages) || (this.Pagination.totalPages == 0)))
    {
      this.usuarioService.get({"PageNumber": currentIndex, "PageSize": 5}).subscribe((result : Base<Pagination<Usuario>>) => 
      {
        if (result.isSuccess) 
        {
          this.Usuarios = result.data.items;
          this.Pagination = result.data;
        }
        else 
        {
          alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
        }
      }, Error => alert("Error en servicio interno. Favor intentar luego.")) 
    }
  }

  createUsuario(){
    this.modalService.open(CreateUsuarioComponent);
  }

  updateUsuario(id:number){
    const modalRef = this.modalService.open(UpdateUsuarioComponent);
    modalRef.componentInstance.id = id;
  }
}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "src/app/services/usuario.service";
import { Base } from "src/app/models/base";
import { Pagination } from "src/app/models/pagination";
import { Usuario } from "src/app/models/usuario";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  Usuario : Usuario[];
  Pagination : Pagination = new Pagination();

  constructor(private readonly usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios(1);
  }

  getUsuarios(currentIndex:number){
    if (
      currentIndex > 0 &&
       ((this.Pagination.totalPages > 0 && currentIndex <= this.Pagination.totalPages) ||
       (this.Pagination.totalPages == 0))
       ) {
      this.usuarioService.get({"PageNumber": currentIndex, "PageSize": 5}).subscribe((rest : Base) => {
        if (rest.isSuccess) {
          this.Pagination = rest.data;
          this.Usuario = this.Pagination.items;
        }
        else {
          alert("Ocurrió un error.");
        }
      }, Error => alert("Ocurrió un error.")) 
    }
  }

}

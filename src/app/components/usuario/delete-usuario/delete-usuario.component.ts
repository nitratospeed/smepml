import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Base } from 'src/app/models/base';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.scss']
})
export class DeleteUsuarioComponent implements OnInit {

  @Input() id;

  constructor(public activeModal: NgbActiveModal, private readonly usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  deleteUsuario(){
    this.usuarioService.delete(this.id).subscribe((result : Base<any>) => 
    {
      if (result.isSuccess) 
      {
        alert("Eliminado con éxito.");
        this.activeModal.close(true)
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }
}

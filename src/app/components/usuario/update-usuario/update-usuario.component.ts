import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from "src/app/services/usuario.service";
import { Base } from 'src/app/models/base';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.scss']
})
export class UpdateUsuarioComponent implements OnInit {

  @Input() id;

  usuario : Usuario;

  usuarioForm = new FormGroup({
    id: new FormControl(0),
    nombreCompleto: new FormControl(''),
    correo: new FormControl(''),
    contrasena: new FormControl(''),
    perfil: new FormControl(0),
  });

  constructor(public activeModal: NgbActiveModal, private readonly usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getById(this.id).subscribe((result : Base<Usuario>) => 
    {
      if (result.isSuccess) 
      {
        this.usuario = result.data;
        this.usuarioForm.setValue(this.usuario);
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }

  updateUsuario(){
    this.usuario = this.usuarioForm.value;
    this.usuario.perfil = Number.parseInt(this.usuarioForm.value['perfil']);

    this.usuarioService.put(this.id, this.usuario).subscribe((result : Base<number>) => 
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
}

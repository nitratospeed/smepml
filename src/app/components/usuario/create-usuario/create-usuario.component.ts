import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from "src/app/services/usuario.service";
import { Base } from 'src/app/models/base';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.scss']
})
export class CreateUsuarioComponent implements OnInit {

  usuario : Usuario;

  usuarioForm = new FormGroup({
    nombreCompleto: new FormControl(''),
    correo: new FormControl(''),
    contrasena: new FormControl(''),
    rep_contrasena: new FormControl(''),
    perfil: new FormControl(0),
  });

  constructor(public activeModal: NgbActiveModal, private readonly usuarioService : UsuarioService) { }

  ngOnInit(): void {
  }

  checkContrasena(){
    if (this.usuarioForm.value['contrasena'] != this.usuarioForm.value['rep_contrasena']) {
      alert('Las contraseñas no coinciden.')
      return false;
    }
    return true;
  }

  createUsuario(){
    if (this.checkContrasena()) {
      this.usuario = this.usuarioForm.value;
      this.usuario.perfil = Number.parseInt(this.usuarioForm.value['perfil']);
  
      this.usuarioService.post(this.usuario).subscribe((result : Base<number>) => 
      {
        if (result.isSuccess) 
        {
          alert("Guardado con éxito.");
          this.activeModal.close(true)
        }
        else 
        {
          alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
        }
      }, Error => alert("Error en servicio interno. Favor intentar luego.")) 
    }
  }
}

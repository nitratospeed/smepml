import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from "src/app/services/usuario.service";
import { Base } from 'src/app/models/base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm = new FormGroup({
    correo: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
  });

  constructor(private readonly usuarioService : UsuarioService, private router: Router) { }


  ngOnInit(): void {
  }

  auth(){
    if (this.authForm.valid) {
      this.usuarioService.auth(this.authForm.value).subscribe((result : Base<boolean>) => 
      {
        if (result.isSuccess) 
        {
          if (result.data) {
            alert("Logueado con éxito.");           
            this.router.parseUrl('');
            window.location.reload();
          }
          else {
            alert("Usuario y/o contraseña incorrecta.")
          }
        }
        else 
        {
          alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
        }
      }, Error => alert("Error en servicio interno. Favor intentar luego."))  
    }
 else{
   alert("Ingrese usuario y contraseña.")
 }
  }
}

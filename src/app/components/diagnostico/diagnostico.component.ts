import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PrediccionService } from 'src/app/services/prediccion.service';
import { SintomaService } from 'src/app/services/sintoma.service';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent implements OnInit {

  IsResultadoCount : boolean;
  ResultadoCount : number;
  IsResultado : boolean;
  Resultado : string;

  sintomas = [];

  prediccionForm = this.fb.group({
    Sintoma1: ['', Validators.required],
    Sintoma2: ['', Validators.required],
    Sintoma3: ['', Validators.required],
  });


  constructor(
    private fb: FormBuilder, 
    private readonly prediccionService : PrediccionService, 
    private readonly sintomaService : SintomaService, 
  ) { }

  ngOnInit(): void {
    this.sintomaService.get().subscribe((rest: any) => {
      this.sintomas = rest.data;
    })
  }

  onSubmit() {
    
    this.IsResultadoCount = true;
    this.ResultadoCount = 0;

    if(this.prediccionForm.valid) {
      this.prediccionService.get(this.prediccionForm.value).subscribe((rest : any) => {
        if (rest.succeeded) {
          this.IsResultado = true;
          this.ResultadoCount = 100;
          this.Resultado = rest.data;
        }
        else {
          alert("Ocurrió un error.");
        }
      }, Error => alert("Ocurrió un error."))
    } 
    else {
      alert("Ingrese correctamente los datos.");
    }
  }
}

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

  IsSugerencia : boolean;
  Sugerencia:string;

  keyword = 'nombre';
  data = [];

  sintomas = [];

  prediccionForm = this.fb.group({
    Sintoma1: [''],
    Sintoma2: [''],
    Sintoma3: [''],
  });


  constructor(
    private fb: FormBuilder, 
    private readonly prediccionService : PrediccionService, 
    private readonly sintomaService : SintomaService, 
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    
    this.IsResultadoCount = true;
    this.ResultadoCount = 0;
    this.IsSugerencia = false;

    if(this.prediccionForm.valid && (this.prediccionForm.value.Sintoma1 != ""
    || this.prediccionForm.value.Sintoma2 != ""
    || this.prediccionForm.value.Sintoma3 != "")) {

      this.prediccionService.get(this.prediccionForm.value).subscribe((rest : any) => {
        if (rest.isSuccess) {
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
      alert("Debe ingresar al menos un sintoma.");
    }
  }

  selectEvent(item) {
    // do something with selected item
    if (this.prediccionForm.value.Sintoma1 == "") {
      this.prediccionForm.value.Sintoma1 = item.nombre;
    }

    else if (this.prediccionForm.value.Sintoma2 == "") {
      this.prediccionForm.value.Sintoma2 = item.nombre;
    }

    else if (this.prediccionForm.value.Sintoma3 == "") {
      this.prediccionForm.value.Sintoma3 = item.nombre;
    }

    else {
      alert("Elimine un sintoma");
    }

    this.IsSugerencia = true;

    if (this.prediccionForm.value.Sintoma1 != "" 
    && this.prediccionForm.value.Sintoma2 == ""
    && this.prediccionForm.value.Sintoma3 == "") {
      this.Sugerencia = "Agregue más sintomas para mejorar los resultados.";
    }

    else if(this.prediccionForm.value.Sintoma1 != "" 
    && this.prediccionForm.value.Sintoma2 != ""
    && this.prediccionForm.value.Sintoma3 == "") {
      this.Sugerencia = "Agregue más sintomas para mejorar los resultados.";
    }

    else {
      this.Sugerencia = "Se brindarán resultados más óptimos.";
    }
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.sintomaService.get().subscribe((rest : any) => {
      if (rest.isSuccess) {
        this.data = rest.data;
      }
      else {
        alert("Ocurrió un error.");
      }
    }, Error => alert("Ocurrió un error."))
  }
  
  onFocused(e){
    // do something when input is focused
  }
}

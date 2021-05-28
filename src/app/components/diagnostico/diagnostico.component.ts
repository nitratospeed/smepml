import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PrediccionService } from 'src/app/services/prediccion.service';
import { SintomaService } from 'src/app/services/sintoma.service';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent implements OnInit {

  IsResultado : boolean;
  Resultado : string;

  IsSugerencia : boolean;
  Sugerencia:string;

  keyword = 'nombre';
  data = [];

  Sexo: string;
  Edad: string;
  Elem1: string;
  Elem2: string;
  Elem3: string;
  Elem4: string;
  Elem5: string;
  Sintoma1: string;
  Sintoma2: string;
  Sintoma3: string;

  IsStep1: boolean = true;
  IsStep2: boolean = false;
  IsStep3: boolean = false;
  IsStep4: boolean = false;
  IsStep5: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private readonly prediccionService : PrediccionService, 
    private readonly sintomaService : SintomaService, 
  ) { }

  ngOnInit(): void {
    localStorage.setItem("Sexo", '');
    localStorage.setItem("Edad", '');
    localStorage.setItem("Elem1", '');
    localStorage.setItem("Elem2", '');
    localStorage.setItem("Elem3", '');
    localStorage.setItem("Elem4", '');
    localStorage.setItem("Elem5", '');
    localStorage.setItem("Sintoma1", '');
    localStorage.setItem("Sintoma2", '');
    localStorage.setItem("Sintoma3", '');
  }

  selectEvent(item) {
    // do something with selected item

    if (localStorage.getItem("Sintoma1") == "") {
      localStorage.setItem("Sintoma1", item.nombre)
    }

    else if (localStorage.getItem("Sintoma2") == "") {
      localStorage.setItem("Sintoma2", item.nombre)
    }

    else if (localStorage.getItem("Sintoma3") == "") {
      localStorage.setItem("Sintoma3", item.nombre)
    }

    else {
      alert("Elimine un sintoma");
    }

    this.IsSugerencia = true;

    if (localStorage.getItem("Sintoma1") != "" 
    && localStorage.getItem("Sintoma2") == ""
    && localStorage.getItem("Sintoma3") == "") {
      this.Sugerencia = "Agregue más sintomas para mejorar los resultados.";
    }

    else if(localStorage.getItem("Sintoma1") != "" 
    && localStorage.getItem("Sintoma2") != ""
    && localStorage.getItem("Sintoma3") == "") {
      this.Sugerencia = "Agregue más sintomas para mejorar los resultados.";
    }

    else {
      this.Sugerencia = "Se brindarán resultados más óptimos.";
    }

    this.Sintoma1 = localStorage.getItem("Sintoma1");
    this.Sintoma2 = localStorage.getItem("Sintoma2");
    this.Sintoma3 = localStorage.getItem("Sintoma3");

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

  onClear(item) {
    if (item == "s1") {
      localStorage.setItem("Sintoma1", '');
      this.Sintoma1 = "";
    }
    else if (item == "s2") {
      localStorage.setItem("Sintoma2", '');
      this.Sintoma2 = "";
    }
    else if (item == "s3") {
      localStorage.setItem("Sintoma3", '');
      this.Sintoma3 = "";
    }
  }

  step1() {
    this.IsStep1 = true;
    this.IsStep2 = false;
    this.IsStep3 = false;
    this.IsStep4 = false;
    this.IsStep5 = false;
  }

  step2() {
    const elem1 = (document.querySelector('input[name = "rbSexo"]:checked') as HTMLInputElement);

    if(elem1 == null) {
      alert("Debe seleccionar al menos una opción.")
    }
    else{
      localStorage.setItem("Sexo", elem1.value)
      this.IsStep1 = false;
      this.IsStep2 = true;
      this.IsStep3 = false;
      this.IsStep4 = false;
      this.IsStep5 = false;
    }
  }

  step3() {
    const elemEdad = (document.getElementById("Edad") as HTMLInputElement);

    if(elemEdad && elemEdad.value == "") {
      alert("Debe seleccionar una edad válida.")
    }
    else{
      localStorage.setItem("Edad", elemEdad.value)
    this.IsStep1 = false;
    this.IsStep2 = false;
    this.IsStep3 = true;
    this.IsStep4 = false;
    this.IsStep5 = false;
    }
  }

  step4() {
    const elem1 = (document.querySelector('input[name = "rbSobrepeso"]:checked') as HTMLInputElement);
    const elem2 = (document.querySelector('input[name = "rbCigarrillos"]:checked') as HTMLInputElement);
    const elem3 = (document.querySelector('input[name = "rbHipertension"]:checked') as HTMLInputElement);
    const elem4 = (document.querySelector('input[name = "rbDiabetes"]:checked') as HTMLInputElement);
    const elem5 = (document.querySelector('input[name = "rbColesterol"]:checked') as HTMLInputElement);

    if(
      (elem1 == null) ||
      (elem2 == null) ||
      (elem3 == null) ||
      (elem4 == null) ||
      (elem5 == null)
      ) {
      alert("Debe seleccionar una de cada opción.")
    }
    else{

      localStorage.setItem("Elem1", elem1.value);
      localStorage.setItem("Elem2", elem2.value);
      localStorage.setItem("Elem3", elem3.value);
      localStorage.setItem("Elem4", elem4.value);
      localStorage.setItem("Elem5", elem5.value);

    this.IsStep1 = false;
    this.IsStep2 = false;
    this.IsStep3 = false;
    this.IsStep4 = true;
    this.IsStep5 = false;
    }
  }

  step5() {
    
    this.IsSugerencia = false;

    if(localStorage.getItem("Sintoma1") != ""
    || localStorage.getItem("Sintoma2") != ""
    || localStorage.getItem("Sintoma3") != "") {

      this.IsStep1 = false;
      this.IsStep2 = false;
      this.IsStep3 = false;
      this.IsStep4 = false;
      this.IsStep5 = true;

      this.Sintoma1 = localStorage.getItem("Sintoma1");
      this.Sintoma2 = localStorage.getItem("Sintoma2");
      this.Sintoma3 = localStorage.getItem("Sintoma3");

      this.prediccionService.get({Sintoma1: this.Sintoma1, Sintoma2: this.Sintoma2, Sintoma3: this.Sintoma3}).subscribe((rest : any) => {
        if (rest.isSuccess) {
          this.IsResultado = true;
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

  reset(){
    this.IsStep1 = true;
    this.IsStep2 = false;
    this.IsStep3 = false;
    this.IsStep4 = false;
    this.IsStep5 = false;

    localStorage.setItem("Sintoma1", '');
    this.Sintoma1 = "";

    localStorage.setItem("Sintoma2", '');
      this.Sintoma2 = "";

      localStorage.setItem("Sintoma3", '');
      this.Sintoma3 = "";  
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators, Form } from '@angular/forms';
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
  Nivel:string;

  keyword = 'nombre';
  data = [];

  diagnosticoForm = this.fb.group({
    Sexo: ['', Validators.required],
    Edad: [18, Validators.required],
    Sobrepeso: ['', Validators.required],
    Cigarrillos: ['', Validators.required],
    Hipertension: ['', Validators.required],
    Diabetes: ['', Validators.required],
    Colesterol: ['', Validators.required],
    sintomas: this.fb.array([])
  });

  IsStep1: boolean = true;
  IsStep2: boolean = false;
  IsStep3: boolean = false;
  IsStep4: boolean = false;
  IsStep5: boolean = false;

  bntStyleM: string = "";
  bntStyleF: string = "";

  constructor(
    private fb: FormBuilder, 
    private readonly prediccionService : PrediccionService, 
    private readonly sintomaService : SintomaService, 
  ) { }

  ngOnInit(): void {

    this.sintomaService.get().subscribe((rest : any) => {
      if (rest.isSuccess) {
        this.data = rest.data;
      }
      else {
        alert("Ocurrió un error.");
      }
    }, Error => alert("Ocurrió un error."))
  }

  get sintomas() {
    return this.diagnosticoForm.get('sintomas') as FormArray
  }

  selectEvent(item) {
    // do something with selected item

    this.IsSugerencia = true;
    this.Sugerencia = "";
    this.Nivel = "";

    let yaExiste = false;

    if(this.sintomas.length >= 12){
      alert("Máximo 12 síntomas.");
    }
    else{
      for (let index = 0; index < this.sintomas.length; index++) {     
        let element = this.sintomas.at(index).value;
        if (element == item.nombre) {
          alert('El sintoma ingresado ya existe.');
          yaExiste = true;
          break;
        }
      }
      if(!yaExiste){
        this.sintomas.push(this.fb.control(item.nombre));
      }
    }

    if(this.sintomas.length <= 4){
      this.Sugerencia = "Sugerencia: Agregue muchos más síntomas.";
      this.Nivel = "Potencial de acierto: Débil";
    }

    if(this.sintomas.length >= 5 && this.sintomas.length <= 8){
      this.Sugerencia = "Sugerencia: Agregue algunos síntomas más.";
      this.Nivel = "Potencial de acierto: Moderado";
    }

    if(this.sintomas.length >= 9 && this.sintomas.length <= 12){
      this.Sugerencia = "Sugerencia: Resultados Óptimos.";
      this.Nivel = "Potencial de acierto: Fuerte";
    }
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.

  }
  
  onFocused(e){
    // do something when input is focused
  }

  onClear(item) {
    this.sintomas.removeAt(item);
  }

  onChangeSexo(item) {
    this.diagnosticoForm.patchValue({
      Sexo: item
    });

    this.bntStyleM = "";
    this.bntStyleF = "";

    if(this.diagnosticoForm.controls['Sexo'].value == "M"){
      this.bntStyleM = "active";
    }
    else if(this.diagnosticoForm.controls['Sexo'].value == "F"){
      this.bntStyleF = "active";
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
    if(this.diagnosticoForm.controls['Sexo'].value == "") {
      alert("Debe seleccionar al menos una opción.")
    }
    else{
      this.IsStep1 = false;
      this.IsStep2 = true;
      this.IsStep3 = false;
      this.IsStep4 = false;
      this.IsStep5 = false;
    }
  }

  step3() {
    if(this.diagnosticoForm.controls['Edad'].value == "") {
      alert("Obligatorio*")
    }
    else if(this.diagnosticoForm.controls['Edad'].value < 18) {
      alert("Edad mayor o igual a 18")
    }
    else if(this.diagnosticoForm.controls['Edad'].value > 75) {
      alert("Edad menor o igual a 75")
    }
    else{

    this.IsStep1 = false;
    this.IsStep2 = false;
    this.IsStep3 = true;
    this.IsStep4 = false;
    this.IsStep5 = false;
    }
  }

  step4() {
    if(
      this.diagnosticoForm.controls['Sobrepeso'].value == "" ||
      this.diagnosticoForm.controls['Cigarrillos'].value == "" ||
      this.diagnosticoForm.controls['Hipertension'].value == "" ||
      this.diagnosticoForm.controls['Diabetes'].value == "" ||
      this.diagnosticoForm.controls['Colesterol'].value == ""
      ) {
      alert("Obligatorio*")
    }
    else{

    this.IsStep1 = false;
    this.IsStep2 = false;
    this.IsStep3 = false;
    this.IsStep4 = true;
    this.IsStep5 = false;
    }
  }

  step5() {

    if(this.sintomas.length == 0){
      alert("Debe ingresar al menos un sintoma.")
    }
    else{
      this.IsSugerencia = false;

      this.IsStep1 = false;
      this.IsStep2 = false;
      this.IsStep3 = false;
      this.IsStep4 = false;
      this.IsStep5 = true;

      let Sexo = this.diagnosticoForm.controls['Sexo'].value;
      let Edad = this.diagnosticoForm.controls['Edad'].value;
      let Condiciones : Array<string> = ['Diabetes', 'Cigarrillos'];
      let Sintomas = this.sintomas.value;

      console.log(this.diagnosticoForm.value);

      this.prediccionService.get({"Sexo": Sexo, "Edad": Edad, "Condiciones": Condiciones, "Sintomas": Sintomas}).subscribe((rest : any) => {
        if (rest.isSuccess) {
          this.IsResultado = true;
          this.Resultado = rest.data;
        }
        else {
          alert("Ocurrió un error.");
        }
      }, Error => alert("Ocurrió un error."))
    }
  }

  reset(){
    this.IsStep1 = true;
    this.IsStep2 = false;
    this.IsStep3 = false;
    this.IsStep4 = false;
    this.IsStep5 = false;

    this.bntStyleM = "";
    this.bntStyleF = "";

    this.diagnosticoForm.patchValue({
      Sexo: "",
      Edad: "18",
      Sobrepeso: "",
      Cigarrillos: "",
      Hipertension: "",
      Diabetes: "",
      Colesterol: ""
    });

    this.sintomas.clear();
  }
}

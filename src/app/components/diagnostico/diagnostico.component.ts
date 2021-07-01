import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { PrediccionService } from 'src/app/services/prediccion.service';
import { SintomaService } from 'src/app/services/sintoma.service';
import { Enfermedades } from 'src/app/models/enfermedades';
import { Sintomas } from 'src/app/models/sintomas';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent implements OnInit {

  ListaSintomas : Sintomas[];

  ListaSintomasFiltrada : Sintomas[];

  Resultados : Enfermedades[];

  IsResultado : boolean;

  IsPreguntas : boolean = false;

  IsSugerencia : boolean;

  Sugerencia:string;

  Nivel:string;

  keyword = 'nombre';

  bntStyleM: string = "";
  bntStyleF: string = "";

  svgStyleHead: string = "#57c9d5";
  svgStyleLeftShoulder: string = "#57c9d5";
  svgStyleRightShoulder: string = "#57c9d5";
  svgStyleLeftArm: string = "#57c9d5";
  svgStyleRightArm: string = "#57c9d5";
  svgStyleChest: string = "#57c9d5";
  svgStyleStomach: string = "#57c9d5";
  svgStyleLeftLeg: string = "#57c9d5";
  svgStyleRightLeg: string = "#57c9d5";
  svgStyleLeftHand: string = "#57c9d5";
  svgStyleRightHand: string = "#57c9d5";
  svgStyleLeftFoot: string = "#57c9d5";
  svgStyleRightFoot: string = "#57c9d5";

  IsStep1: boolean = true;
  IsStep2: boolean = false;
  IsStep3: boolean = false;
  IsStep4: boolean = false;
  IsStep5: boolean = false;
  IsStep6: boolean = false;

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

  constructor(
    private fb: FormBuilder, 
    private readonly prediccionService : PrediccionService, 
    private readonly sintomaService : SintomaService, 
  ) { }

  ngOnInit(): void {
    this.getSintomasFromService();
  }

  getSintomasFromService(){
    this.sintomaService.get().subscribe((rest : any) => {
      if (rest.isSuccess) {
        this.ListaSintomas = rest.data;
        console.log(this.ListaSintomas);
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
   this.afterSelect(item.nombre)
  }

  afterSelect(sintoma: string){
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
        if (element == sintoma) {
          alert('El sintoma ingresado ya existe.');
          yaExiste = true;
          break;
        }
      }
      if(!yaExiste){
        this.sintomas.push(this.fb.control(sintoma));

        let itemIndex = this.ListaSintomas.findIndex(x=>x.nombre == sintoma);

        this.ListaSintomas[itemIndex].hasChecked = true;

        this.IsPreguntas = false;

        this.ListaSintomas.forEach(element => {
          if(element.hasChecked && element.hasPreguntas){
            this.IsPreguntas = true;
          }
        });

        let sintomaEncontrado = this.ListaSintomas.find(x=>x.nombre == sintoma);

        let t = sintomaEncontrado.zonaId;

        if (t == 1) { this.svgStyleHead = "#ff7d16" } 
        else if (t == 2) { this.svgStyleLeftShoulder = "#ff7d16"; this.svgStyleRightShoulder = "#ff7d16";  }
        else if (t == 3) { this.svgStyleLeftArm = "#ff7d16"; this.svgStyleRightArm = "#ff7d16";  }
        else if (t == 4) { this.svgStyleChest = "#ff7d16" }
        else if (t == 5) { this.svgStyleStomach = "#ff7d16" }
        else if (t == 6) { this.svgStyleLeftLeg = "#ff7d16"; this.svgStyleRightLeg = "#ff7d16"; }
        else if (t == 7) { this.svgStyleRightHand = "#ff7d16"; this.svgStyleRightHand = "#ff7d16"; }
        else if (t == 8) { this.svgStyleLeftFoot = "#ff7d16"; this.svgStyleRightFoot = "#ff7d16"; }

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

    let element1 = this.sintomas.at(item).value;

    this.sintomas.removeAt(item);

    this.IsPreguntas = false;

    console.log(element1);

    let itemIndex = this.ListaSintomas.findIndex(x=>x.nombre == element1);

    this.ListaSintomas[itemIndex].hasChecked = false;

    this.ListaSintomas.forEach(element => {
      if((element.hasChecked == true) && (element.hasPreguntas == true)){
        this.IsPreguntas = true;
        console.log('here');
      }
    });

    this.Sugerencia = "";
    this.Nivel = "";

    if(this.sintomas.length >= 1 && this.sintomas.length <= 4){
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

    let sintomaAEliminar = this.ListaSintomas.find(x=>x.nombre == element1);

    let t = sintomaAEliminar.zonaId;

    if (t == 1) { this.svgStyleHead = "#57c9d5" } 
    else if (t == 2) { this.svgStyleLeftShoulder = "#57c9d5"; this.svgStyleRightShoulder = "#57c9d5";  }
    else if (t == 3) { this.svgStyleLeftArm = "#57c9d5"; this.svgStyleRightArm = "#57c9d5";  }
    else if (t == 4) { this.svgStyleChest = "#57c9d5" }
    else if (t == 5) { this.svgStyleStomach = "#57c9d5" }
    else if (t == 6) { this.svgStyleLeftLeg = "#57c9d5"; this.svgStyleRightLeg = "#57c9d5"; }
    else if (t == 7) { this.svgStyleRightHand = "#57c9d5"; this.svgStyleRightHand = "#57c9d5"; }
    else if (t == 8) { this.svgStyleLeftFoot = "#57c9d5"; this.svgStyleRightFoot = "#57c9d5"; }
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
    this.IsStep6 = false;
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
      this.IsStep6 = false;
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
    this.IsStep6 = false;
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
    this.IsStep6 = false;
    }
  }

  step5() {

    console.log(this.IsPreguntas);
    console.log(this.sintomas.length);

    this.IsStep1 = false;
    this.IsStep2 = false;
    this.IsStep3 = false;
    this.IsStep4 = false;
    this.IsStep5 = false;
    this.IsStep6 = true;

    if(this.sintomas.length == 0){
        this.IsStep4 = true;
        this.IsStep5 = false;
        this.IsStep6 = false;
      alert("Debe ingresar al menos un sintoma");
    }
    else{
      if(this.IsPreguntas == true){
        this.IsStep5 = true;
        this.IsStep6 = false;
      }
      else{
        this.step6();
      }
    }
  }

  getBodyPartName(t,d) {
    this.ListaSintomasFiltrada = this.ListaSintomas.filter(x=>x.zonaId == t);
  }

  onPreguntaChecked(sintomaId:number, preguntaId: number, opcion: string){
    this.ListaSintomas.find(x=>x.id == sintomaId).preguntas.forEach(element => {
      if (element.id == preguntaId) {
        element.opcionEscogida = opcion;
      }     
    });
  }

  step6() {
    console.log(this.ListaSintomas);
    let InvalidForm : boolean = false;

    this.ListaSintomas.filter(x=>x.hasPreguntas && x.hasChecked).forEach(element => {
      element.preguntas.forEach(element1 => {
        console.log(element1);
        if (element1.opcionEscogida == "") {
          InvalidForm = true;
        }
      });
    });

    if (InvalidForm) {
      alert('Todos los campos son obligatorios*');
      this.IsStep1 = false;
      this.IsStep2 = false;
      this.IsStep3 = false;
      this.IsStep4 = false;
      this.IsStep5 = true;
      this.IsStep6 = false;
    }
    else {
      this.IsSugerencia = false;

      this.IsStep1 = false;
      this.IsStep2 = false;
      this.IsStep3 = false;
      this.IsStep4 = false;
      this.IsStep5 = false;
      this.IsStep6 = true;

      let Sexo = this.diagnosticoForm.controls['Sexo'].value;
      let Edad = this.diagnosticoForm.controls['Edad'].value;
      let Condiciones : Array<string> = ['Diabetes', 'Cigarrillos'];
      let Sintomas = this.sintomas.value;

      console.log(this.diagnosticoForm.value);

      this.prediccionService.get({"Sexo": Sexo, "Edad": Edad, "Condiciones": Condiciones, "Sintomas": Sintomas}).subscribe((rest : any) => {
        if (rest.isSuccess) {
          this.IsResultado = true;
          let res : string[] = rest.data;

          let resList = [];

          res.forEach(element => {
            let enf = {} as Enfermedades;

            enf.nombre = element.split(':')[0];
            enf.porcentaje = element.split(':')[1];
            enf.porcentaje_numero = Number(element.split(':')[1].replace("%","").replace(" ",""));

            resList.push(enf);
          });

          this.Resultados = resList;
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
    this.IsStep6 = false;

    this.bntStyleM = "";
    this.bntStyleF = "";

    this.IsResultado = false;
    this.IsPreguntas = false;

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

    this.svgStyleHead = "#57c9d5";
    this.svgStyleLeftShoulder = "#57c9d5";
    this.svgStyleRightShoulder = "#57c9d5";
    this.svgStyleLeftArm = "#57c9d5";
    this.svgStyleRightArm = "#57c9d5";
    this.svgStyleChest = "#57c9d5";
    this.svgStyleStomach = "#57c9d5";
    this.svgStyleLeftLeg = "#57c9d5";
    this.svgStyleRightLeg = "#57c9d5";
    this.svgStyleLeftHand = "#57c9d5";
    this.svgStyleRightHand = "#57c9d5";
    this.svgStyleLeftFoot = "#57c9d5";
    this.svgStyleRightFoot = "#57c9d5";

    this.ListaSintomas.length = 0;
    this.ListaSintomasFiltrada.length = 0;

    this.getSintomasFromService();
  }
}
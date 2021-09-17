import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { DiagnosticoService } from "src/app/services/diagnostico.service";
import { PacienteService } from "src/app/services/paciente.service";
import { SintomaService } from "src/app/services/sintoma.service";
import { EnfermedadService } from "src/app/services/enfermedad.service";
import { Base } from 'src/app/models/base';
import { Pagination } from "src/app/models/pagination";
import { Diagnostico } from 'src/app/models/diagnostico';
import { Paciente } from 'src/app/models/paciente';
import { Sintoma } from 'src/app/models/sintoma';
import { Enfermedad } from 'src/app/models/enfermedad';
import { Opcion } from 'src/app/models/opcion';
import { PredictDiagnosticoDto } from 'src/app/models/predict-diagnostico-dto';

@Component({
  selector: 'app-create-diagnostico',
  templateUrl: './create-diagnostico.component.html',
  styleUrls: ['./create-diagnostico.component.scss']
})
export class CreateDiagnosticoComponent implements OnInit {

  diagnostico : Diagnostico;

  paciente : Paciente;

  condicionesList : string[] = [];

  sintomasList : Sintoma[];
  sintomasList2 : Sintoma[];

  opcionesList : Opcion[];

  recomendaciones : string;
  examenes : string[];

  showDniControl : boolean = true;
  showCondicionesControl : boolean = false;
  showSintomasControl : boolean = false;
  showPreguntasControl : boolean = false;
  showResultados : number = 0;

  diagnosticoForm = this.fb.group({
    pacienteDni: [''],
    pacienteId: [0],
    condiciones: this.fb.array([]),
    sintomaSubstring: [''],
    sintomas: this.fb.array([]),
    preguntas: this.fb.array([]),
    resultados: [''],
    resultadoMasPreciso: [''],
  });

  constructor(public activeModal: NgbActiveModal, 
    private fb: FormBuilder,
    private readonly diagnosticoService : DiagnosticoService,
    private readonly sintomaService : SintomaService,
    private readonly pacienteService : PacienteService,
    private readonly enfermedadService : EnfermedadService) { }

  ngOnInit(): void {
    this.condicionesList.push("¿Tuvo o tiene sobrepeso?");
    this.condicionesList.push("¿Fumaba o fuma cigarrillos?");
    this.condicionesList.push("¿Tiene hipertensión?");
    this.condicionesList.push("¿Tiene diabetes?");
    this.condicionesList.push("¿Tuvo o tiene colesterol alto?");

    this.condicionesList.forEach(element => {
      this.condiciones.push(this.fb.group({
        nombre: [element],
        resultado: ['']
      }));
    });

    this.getSintomas();
  }

  get condiciones() {
    return this.diagnosticoForm.get('condiciones') as FormArray;
  }

  get sintomas() {
    return this.diagnosticoForm.get('sintomas') as FormArray;
  }

  get preguntas() {
    return this.diagnosticoForm.get('preguntas') as FormArray;
  }

  getPacienteByDni(dni:string) {
    if(dni != ""){
      this.pacienteService.get({"Dni": dni}).subscribe((result : Base<Pagination<Paciente>>) => 
      {
        if (result.isSuccess) 
        {
          if (result.data.items.length>0) {
            this.paciente = result.data.items[0];
            this.diagnosticoForm.patchValue({
              pacienteId: this.paciente.id,
            });
            alert(`Paciente encontrado, Sr/Sra: ${ this.paciente.apellidos }`);
            this.showDniControl = false;
            this.showCondicionesControl = true;
          }
          else{
            alert(`No se encontró al paciente con dni: ${ dni }`); 
          }
        }
        else 
        {
          alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}`);
        }
      }, Error => alert("Error en servicio interno. Favor intentar luego.")) 
    }
    else{
      alert("Dni obligatorio.")
    }
  }

  validateCondiciones(){
    if (this.condiciones.controls.some(x=>x.value.resultado == '')) {
      alert("Favor llenar todas las preguntas.")
    }
    else{
      this.showCondicionesControl = false;
      this.showSintomasControl = true;
    }
  }

  getSintomas() {
    this.sintomaService.get().subscribe((result : Base<Sintoma[]>) => 
    {
      if (result.isSuccess) 
      {
        this.sintomasList = result.data;
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))   
  }

  filterSintomas(event){
    this.sintomasList2 = this.sintomasList.filter(x=>x.nombre.toLowerCase().includes(event.target.value.toLowerCase())).slice(0, 3);
  }

  addSintoma(event){
    let sintomaNombre : string = event.target.value;
    let sintoma = {preguntas : {}} as Sintoma;
    sintoma = this.sintomasList.find(x=>x.nombre.toLowerCase() == sintomaNombre.toLowerCase());
    this.sintomasList2 = [];     
    this.diagnosticoForm.patchValue({
      sintomaSubstring: '',
    });

    if (this.sintomas.controls.some(x=>x.value.nombre == sintomaNombre)) {
      alert("El sintoma ya ha sido escogido.");
    } 
    else {
      this.sintomas.push(this.fb.group({
        nombre: sintoma.nombre,
        resultado: ['ok'],
        hasPreguntas : sintoma.hasPreguntas,
      }));

      sintoma.preguntas.forEach(element1 => {
        this.preguntas.push(this.fb.group({
          sintoma: [sintoma.nombre],
          nombre: [element1.descripcion],
          resultado: [''],
          opciones: [element1.opciones],
        }));
      });   
    }
  }

  validateSintomas(){
    if (this.sintomas.controls.length == 0) {
      alert("Favor escoger al menos un sintoma.")
    }
    else{
      this.showSintomasControl = false;
      this.showPreguntasControl = true;
    }
  }

  predictDiagnostico(){
    if (this.preguntas.controls.some(x=>x.value.resultado == '')) {
      alert("Favor de llenar todas las preguntas.")
    }
    else{
      this.showPreguntasControl = false;
      this.showResultados = 1;

      this.diagnostico = this.diagnosticoForm.value;
      this.diagnostico.pacienteId = Number.parseInt(this.diagnosticoForm.value['pacienteId']);
  
      let condicionesx : string[] = [];
      this.diagnosticoForm.value['condiciones'].forEach(element => {
        condicionesx.push(`${ element.nombre }: ${ element.resultado }`)
      });
  
      let sintomasx : string[] = [];
      this.diagnosticoForm.value['sintomas'].forEach(element => {
        sintomasx.push(`${ element.nombre }: ${ element.resultado }`)
      });
  
      let preguntasx : string[] = [];
      this.diagnosticoForm.value['preguntas'].forEach(element => {
        preguntasx.push(`${ element.nombre }: ${ element.resultado }`)
      });
  
      this.diagnosticoService.predict(
        { "edad": this.paciente.edad,
          "genero": this.paciente.genero,
          "condiciones": condicionesx,
          "sintomas": sintomasx,
          "preguntas": preguntasx }
            ).subscribe((result : Base<PredictDiagnosticoDto>) => 
      {
        if (result.isSuccess) 
        {
          alert("Predecido con éxito.");
          
          this.diagnosticoForm.patchValue({
            resultados: result.data.resultados,
            resultadoMasPreciso: result.data.resultadoMasPreciso
          });
  
          this.getEnfRecomExam();
  
          this.createDiagnostico();
          
          this.showResultados = 2;
        }
        else 
        {
          alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
        }
      }, Error => alert("Error en servicio interno. Favor intentar luego."))
    }
  }
  
  getEnfRecomExam(){
    let enfermedad = this.diagnosticoForm.value['resultadoMasPreciso'];
    this.enfermedadService.getByName(enfermedad).subscribe((result : Base<Enfermedad>) => 
    {
      if (result.isSuccess) 
      {
        this.recomendaciones = result.data.recomendacion;
        this.examenes = result.data.examenes;
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))  
  }

  createDiagnostico(){
    this.diagnostico = this.diagnosticoForm.value;
    this.diagnostico.pacienteId = Number.parseInt(this.diagnosticoForm.value['pacienteId']);

    let condicionesx : string[] = [];
    this.diagnosticoForm.value['condiciones'].forEach(element => {
      condicionesx.push(`${ element.nombre }: ${ element.resultado }`)
    });

    let sintomasx : string[] = [];
    this.diagnosticoForm.value['sintomas'].forEach(element => {
      sintomasx.push(`${ element.nombre }: ${ element.resultado }`)
    });

    let preguntasx : string[] = [];
    this.diagnosticoForm.value['preguntas'].forEach(element => {
      preguntasx.push(`${ element.nombre }: ${ element.resultado }`)
    });

    let resultadosx : string[] = [];
    this.diagnosticoForm.value['resultados'].forEach(element => {
      resultadosx.push(`${ element }`)
    });

    this.diagnosticoService.post(
      { "pacienteId": this.paciente.id,
        "condiciones": condicionesx.toString(),
        "sintomas": sintomasx.toString(),
        "preguntas": preguntasx.toString(),
        "resultados": resultadosx.toString(),
        "resultadoMasPreciso": this.diagnosticoForm.value['resultadoMasPreciso']}
    ).subscribe((result : Base<number>) => 
    {
      if (result.isSuccess) 
      {
        alert("Guardado con éxito.");
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }
}

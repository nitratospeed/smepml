import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { DiagnosticoService } from "src/app/services/diagnostico.service";
import { PacienteService } from "src/app/services/paciente.service";
import { SintomaService } from "src/app/services/sintoma.service";
import { Base } from 'src/app/models/base';
import { Pagination } from "src/app/models/pagination";
import { Diagnostico } from 'src/app/models/diagnostico';
import { Paciente } from 'src/app/models/paciente';
import { Sintoma } from 'src/app/models/sintoma';
import { Pregunta } from 'src/app/models/pregunta';
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
    private readonly pacienteService : PacienteService) { }

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

  getPacienteByDni(dni:string) {
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

  get condiciones() {
    return this.diagnosticoForm.get('condiciones') as FormArray;
  }

  get sintomas() {
    return this.diagnosticoForm.get('sintomas') as FormArray;
  }

  get preguntas() {
    return this.diagnosticoForm.get('preguntas') as FormArray;
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

    this.sintomas.push(this.fb.group({
      nombre: sintoma.nombre,
      resultado: ['ok'],
      hasPreguntas : sintoma.hasPreguntas,
    }));

    this.sintomasList2 = [];
    
    this.diagnosticoForm.patchValue({
      sintomaSubstring: '',
    });

    sintoma.preguntas.forEach(element1 => {
      this.preguntas.push(this.fb.group({
        sintoma: [sintoma.nombre],
        nombre: [element1.descripcion],
        resultado: [''],
        opciones: [element1.opciones],
      }));
    });
  }

  showFormResult(){
    console.log(this.diagnosticoForm.value);
  }

  predictDiagnostico(){
    this.diagnostico = this.diagnosticoForm.value;
    this.diagnostico.pacienteId = Number.parseInt(this.diagnosticoForm.value['pacienteId']);

    this.diagnosticoService.predict(
      { "edad": this.paciente.edad,
        "genero": this.paciente.genero,
        "condiciones": this.diagnosticoForm.value['condiciones'],
        "sintomas": this.diagnosticoForm.value['sintomas'],
        "preguntas": this.diagnosticoForm.value['preguntas'] }
          ).subscribe((result : Base<PredictDiagnosticoDto>) => 
    {
      if (result.isSuccess) 
      {
        alert("Predecido con éxito.");
        this.diagnosticoForm.patchValue({
          resultados: result.data.resultados,
          resultadoMasPreciso: result.data.resultadoMasPreciso
        });
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

    this.diagnosticoService.post(this.diagnostico).subscribe((result : Base<number>) => 
    {
      if (result.isSuccess) 
      {
        alert("Guardado con éxito.");
        this.activeModal.close('Success click')
      }
      else 
      {
        alert(`${ result.message }: ${ result.exception }: ${ result.validationErrors}"`);
      }
    }, Error => alert("Error en servicio interno. Favor intentar luego."))
  }
}

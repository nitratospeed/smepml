import { Paciente } from "./paciente";

export interface Diagnostico {
    id: number;
    pacienteId: number;
    paciente: Paciente;
    condiciones: string;
    sintomas: string;
    preguntas: string;
    resultados: string;
    resultadoMasPreciso: string;
}

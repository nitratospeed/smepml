import { Pregunta } from "./pregunta";

export interface Sintoma {
    id: number;
    nombre : string;
    hasPreguntas: boolean;
    preguntas: Pregunta[];
    zonaId: number;
}

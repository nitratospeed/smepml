import { Preguntas } from "./preguntas";

export class Sintomas {
    id: number;
    nombre : string;
    hasPreguntas: boolean;
    preguntas: Preguntas[];
    hasChecked: boolean;
    zonaId: number;
}

import { Opciones } from "./opciones";

export class Preguntas {
    id: number;
    descripcion : string;
    opciones : Opciones[];
    opcionEscogida : string;
    sintomaId : number;
}
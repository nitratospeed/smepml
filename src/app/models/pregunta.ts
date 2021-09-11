import { Opcion } from "./opcion";

export interface Pregunta {
    id: number;
    descripcion : string;
    opciones : Opcion[];
    opcionEscogida : string;
    sintomaId : number;
}

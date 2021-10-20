export interface Incidencia {
    id: number,
    urgencia: string,
    titulo: string,
    descripcion: string,
    adjuntoUrl: string,
    estado: string,
    seguimientos: Seguimiento[]
}

export interface Seguimiento{
    id: number,
    descripcion: string,
    incidenciaId: number
}
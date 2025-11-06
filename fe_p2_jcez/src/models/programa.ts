import type { NivelesAcademico } from './nivelesacademico'

export interface Programa {
  id: number
  idNivelAcademico: number
  nombre: string
  descripcion: string
  version: number
  duracionMeses: number
  costo: number
  fechaInicio: Date
  estado: string

  nivelesacademico: NivelesAcademico
}

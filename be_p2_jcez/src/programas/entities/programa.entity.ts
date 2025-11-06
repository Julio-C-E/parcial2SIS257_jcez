import { NivelesAcademico } from 'src/niveles_academicos/entities/niveles_academico.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('programas')
export class Programa {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_nivel_academico' })
  idNivelAcademico: number;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 2000 })
  descripcion: string;

  @Column('integer')
  version: number;

  @Column('integer', { name: 'duracion_meses' })
  duracionMeses: number;

  @Column('decimal', { precision: 10, scale: 2 })
  costo: number;

  @Column('date', { name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column('varchar', { length: 20 })
  estado: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(
    () => NivelesAcademico,
    (nivelesacademico) => nivelesacademico.programas,
  )
  @JoinColumn({ name: 'id_nivel_academico', referencedColumnName: 'id' })
  nivelesacademico: NivelesAcademico;
}

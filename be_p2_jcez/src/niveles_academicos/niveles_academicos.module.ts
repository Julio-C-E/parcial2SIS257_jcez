import { Module } from '@nestjs/common';
import { NivelesAcademicosService } from './niveles_academicos.service';
import { NivelesAcademicosController } from './niveles_academicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelesAcademico } from './entities/niveles_academico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NivelesAcademico])],
  controllers: [NivelesAcademicosController],
  providers: [NivelesAcademicosService],
})
export class NivelesAcademicosModule {}

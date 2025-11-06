import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNivelesAcademicoDto } from './dto/create-niveles_academico.dto';
import { UpdateNivelesAcademicoDto } from './dto/update-niveles_academico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelesAcademico } from './entities/niveles_academico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NivelesAcademicosService {
  constructor(@InjectRepository(NivelesAcademico) private nivelesAcademicosRepository: Repository<NivelesAcademico>) {}
  async create(createNivelesAcademicoDto: CreateNivelesAcademicoDto): Promise<NivelesAcademico> {
    let nivelesAcademico = await this.nivelesAcademicosRepository.findOneBy({
      nombre: createNivelesAcademicoDto.nombre.trim(),
    });
    if(nivelesAcademico) throw new ConflictException('El nivel academico ya existe');

    nivelesAcademico = new NivelesAcademico();
    Object.assign(nivelesAcademico, createNivelesAcademicoDto);
    return this.nivelesAcademicosRepository.save(nivelesAcademico);
  }

   async findAll(): Promise<NivelesAcademico[]> {
    return this.nivelesAcademicosRepository.find({order: {nombre: 'ASC'}});
  }

  async findOne(id: number): Promise<NivelesAcademico> {
    const nivelesAcademico = await this.nivelesAcademicosRepository.findOneBy({id});
    if (!nivelesAcademico) throw new NotFoundException('El nivel academico no existe');
    return nivelesAcademico;
  }

  async update(id: number, updateNivelesAcademicoDto: UpdateNivelesAcademicoDto): Promise<NivelesAcademico> {
    const nivelesAcademico =  await this.findOne(id);
    Object.assign(nivelesAcademico, updateNivelesAcademicoDto);
    return this.nivelesAcademicosRepository.save(nivelesAcademico);
  }

  async remove(id: number): Promise<NivelesAcademico> {
    const nivelesAcademico =  await this.findOne(id);
    return this.nivelesAcademicosRepository.softRemove(nivelesAcademico);
  }
}

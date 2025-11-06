import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramasService {
  constructor(
    @InjectRepository(Programa)
    private programasrepository: Repository<Programa>,
  ) {}
  async create(createProgramaDto: CreateProgramaDto): Promise<Programa> {
    let programa = await this.programasrepository.findOneBy({
      idNivelAcademico: createProgramaDto.idNivelAcademico,
      nombre: createProgramaDto.nombre.trim(),
    });

    if (programa) throw new ConflictException('El progrma ya existe');

    programa = new Programa();
    Object.assign(programa, createProgramaDto);
    return this.programasrepository.save(programa);
  }

  async findAll():Promise<Programa[]> {
    return this.programasrepository.find({
      relations:{nivelesacademico: true},
      select:{
        id: true,
        nombre:true,
        descripcion: true,
        version: true,
        duracionMeses: true,
        costo: true,
        fechaInicio: true,
        estado:true,
        nivelesacademico:{id:true, nombre:true},
      },
      order: {nombre: 'ASC'}
    });
  }

  async findOne(id: number): Promise<Programa> {
    const programa = await this.programasrepository.findOne({
      where: {id},
      relations:{nivelesacademico:true},
    });
    if(!programa) throw new NotFoundException('el Programa no existe');
    return programa;
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto):Promise<Programa> {
    const programa = await this.findOne(id);
    Object.assign(programa, updateProgramaDto);
    return this.programasrepository.save(programa);
  }

  async remove(id: number): Promise<Programa> {
    const programa = await this.findOne(id);
    return this.programasrepository.softRemove(programa);
  }
}

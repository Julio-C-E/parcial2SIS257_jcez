import { PartialType } from '@nestjs/swagger';
import { CreateNivelesAcademicoDto } from './create-niveles_academico.dto';

export class UpdateNivelesAcademicoDto extends PartialType(CreateNivelesAcademicoDto) {}

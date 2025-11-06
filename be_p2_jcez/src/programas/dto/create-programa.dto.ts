import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsDecimal,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateProgramaDto {
  @ApiProperty()
  @IsDefined({ message: 'El id_Nivel_Academico  debe estar definido' })
  @IsInt({ message: 'El id_Nivel_Academico  debe ser un numero entero' })
  readonly idNivelAcademico: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre no debe estar vacio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  @Transform(({ value }): String | undefined =>
    typeof value === 'string' ? value.trim() : value,
  )
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La descripcion no debe estar vacia' })
  @IsString({ message: 'La descripcion debe ser una cadena de texto' })
  @MaxLength(2000, {
    message: 'La descripcion no debe exceder los 2000 caracteres',
  })
  @Transform(({ value }): String | undefined =>
    typeof value === 'string' ? value.trim() : value,
  )
  readonly descripcion: string;

  @ApiProperty()
  @IsDefined({ message: 'La version debe estar definida' })
  @IsInt({ message: 'La version debe ser un numero entero' })
  readonly version: number;

  @ApiProperty()
  @IsDefined({ message: 'La duracion en meses debe estar definida' })
  @IsInt({ message: 'La duracion en meses debe ser un numero entero' })
  readonly duracionMeses: number;

  @ApiProperty()
  @IsDefined({ message: 'El costo debe estar definido' })
  @Transform(({ value }) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) throw new Error('El costo debe ser un numero decimal');
    return num;
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El costo debe ser un numero decimal con maximo dos decimales' },
  )
  readonly costo: number;

  @ApiProperty()
  @IsDefined({ message: 'La fecha de inicio debe estar definida' })
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha valida' })
  readonly fechaInicio: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'El estado no debe estar vacio' })
  @IsString({ message: 'El estado debe ser una cadena de texto' })
  @MaxLength(20, { message: 'El estado no debe exceder los 20 caracteres' })
  @Transform(({ value }): String | undefined =>
    typeof value === 'string' ? value.trim() : value,
  )
  readonly estado: string;
}

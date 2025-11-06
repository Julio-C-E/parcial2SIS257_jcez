import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateNivelesAcademicoDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El nombre no debe estar vacio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MaxLength(20, { message: 'El nombre no debe exceder los 20 caracteres' })
    @Transform(({ value }): String | undefined => (typeof value === 'string' ? value.trim() : value))
    readonly nombre: string;


    @ApiProperty({ required: false })
    @IsString({ message: 'La descripcion debe ser una cadena de texto' })
    @MaxLength(500, { message: 'La descripcion no debe exceder los 500 caracteres' })
    @Transform(({ value }): String | undefined => (typeof value === 'string' ? value.trim() : value))
    readonly descripcion?: string;
}

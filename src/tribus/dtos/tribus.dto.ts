import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsPositive,
  } from 'class-validator';
  import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
  
  export class CrearTribusDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;
  
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly status: number;
  
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly id_Organization : number
  }
  
  export class ActualizarTribusDto extends PartialType(CrearTribusDto) {}
  

import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsPositive,
    IsEnum
  } from '@nestjs/class-validator';
  
  enum repoEstados {
    ENABLE = 'E',
    DISABLE = 'D',
    ARCHIVED = 'A'
  }
  
  enum registrarEstados {
    ACTIVE = 'A',
    INACTIVE = 'I', 
  }
  
  import { ApiProperty, PartialType } from '@nestjs/swagger';
  import { IsOptional } from 'class-validator';
  
  export class CrearRepositorioDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    readonly tribeId : number;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;
  
    @IsNotEmpty()
    @IsEnum(repoEstados)
    @ApiProperty()
    readonly state: repoEstados;
  
    @IsNotEmpty()
    @IsEnum(registrarEstados)
    @ApiProperty()
    readonly status:registrarEstados;
  
    @IsOptional()
    readonly metricId:number;
  
  }
  
  export class ActualizarRepositorioDto extends PartialType(CrearRepositorioDto) {}
  
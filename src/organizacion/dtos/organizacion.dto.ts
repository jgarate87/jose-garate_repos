import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsPositive,
  } from 'class-validator';
  import { ApiProperty, PartialType }  from '@nestjs/swagger';
  
  export class CrearOrganizacionDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;
  
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly status: number;
  }
  
  export class ActualizarOrganizacionDto extends PartialType(CrearOrganizacionDto) {}
  
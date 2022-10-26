import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsPositive,
    IsDecimal,
    IsOptional,
    Max
  } from 'class-validator';
  
  import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
  
  export class CrearMetricasDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiProperty()
    readonly id_repository: number;
  
    @IsNotEmpty()
    @IsPositive()
    @IsOptional()
    @Max(100)
    @ApiProperty()
    readonly coverage: number;
  
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    readonly bugs: number;
  
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    readonly vulnerabilities: number;
  
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    readonly hostpot: number;
  
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    readonly code_smells: number;
  }
  
  export class ActualizarMetricasDto extends PartialType(CrearMetricasDto) {}
  
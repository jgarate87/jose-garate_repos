import {
    Controller,
    Get,
    Query,
    Param,
    Body,
    Post,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
    ParseIntPipe
  } from '@nestjs/common';
  
  import { TribusServicios } from '../servicios/tribus.service';
  import { CrearTribusDto, ActualizarTribusDto } from '../dtos/tribus.dto';
  import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Entidad Tribus')
  @Controller('tribus')
  export class TribusControlador {
    constructor(private tribusServicio: TribusServicios) { }
  
    @Get()
    getTribus() {
      return this.tribusServicio.findAll();
    }
   
    @Get(':tribuId')
    @HttpCode(HttpStatus.ACCEPTED)
    getOne(@Param('tribuId') tribuId: number) {
      return this.tribusServicio.findOne(tribuId);
    }
  
    @Post()
    create(@Body() data: CrearTribusDto) {
      return this.tribusServicio.create(data);
    }
  
    @Put(':tribuId')
    update(@Param('tribuId',) tribuId: number, @Body() data: ActualizarTribusDto) {
      return this.tribusServicio.update(tribuId, data);
    }
  
    @Delete(':tribuId')
    delete(@Param('tribuId') tribuId: number) {
      return this.tribusServicio.remove(tribuId);
    }
  
  }
  
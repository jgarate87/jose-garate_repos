import { Controller, Get, Query, Param, Body, Post, Put, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';

import { OrganizacionServicios } from '../servicios/organizacion.service';
import { CrearOrganizacionDto, ActualizarOrganizacionDto } from '../dtos/organizacion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Entidad Organizacion')
@Controller('organizacion')
export class OrganizacionControlador {
  constructor(private organizacionServicios: OrganizacionServicios) { }

  @Get()
  getProducts() {
    return this.organizacionServicios.findAll();
  }

  @Get(':organizacionId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('organizacionId') organizacionId: number) {
    return this.organizacionServicios.findOne(organizacionId);
  }

  @Post()
  create(@Body() data: CrearOrganizacionDto) {
    return this.organizacionServicios.create(data);
  }

  @Put(':organizacionId')
  update(@Param('organizacionId') organizacionId: number, @Body() data: ActualizarOrganizacionDto) {
    return this.organizacionServicios.update(organizacionId, data);
  }

  @Delete(':organizacionId')
  delete(@Param('organizacionId') organizacionId: number) {
    return this.organizacionServicios.remove(organizacionId);
  }

}

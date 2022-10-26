import { Organizacion } from './../entidades/organizacion.entity';
import { Controller, Get, Query, Param, Body, Post, Put, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';

import { OrganizacionServicios } from '../servicios/organizacion.service';
import { CrearOrganizacionDto, ActualizarOrganizacionDto } from '../dtos/organizacion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Entidad Organizacion')
@Controller ('organizacion/consultar')
export class OrganizacionControllerConsultar{
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
}

@ApiTags('Entidad Organizacion')
@Controller ('organizacion/crear')
export class OrganizacionControllerCrear{
  constructor(private organizacionServicios: OrganizacionServicios) { }
  @Post()
  create(@Body() data: CrearOrganizacionDto) {
    return this.organizacionServicios.create(data);
  }
}

@ApiTags('Entidad Organizacion')
@Controller ('organizacion/actualizar')
export class OrganizacionControllerActualizar{
  constructor(private organizacionServicios: OrganizacionServicios) { }
  @Put(':organizacionId')
  update(@Param('organizacionId') organizacionId: number, @Body() data: ActualizarOrganizacionDto) {
    return this.organizacionServicios.update(organizacionId, data);
  }
}

@ApiTags('Entidad Organizacion')
@Controller ('organizacion/eliminar')
export class OrganizacionControllerEliminar{
  constructor(private organizacionServicios: OrganizacionServicios) { }
  @Delete(':organizacionId')
  delete(@Param('organizacionId') organizacionId: number) {
    return this.organizacionServicios.remove(organizacionId);
  }
}

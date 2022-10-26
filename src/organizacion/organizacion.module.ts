import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizacionControllerActualizar, OrganizacionControllerConsultar, OrganizacionControllerCrear, OrganizacionControllerEliminar } from './controlador/organizacion.controller';
import { OrganizacionServicios } from './servicios/organizacion.service';
import { Organizacion } from './entidades/organizacion.entity';

import { Tribus } from '../tribus/entidades/tribus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organizacion,Tribus])],
  controllers: [OrganizacionControllerConsultar , OrganizacionControllerCrear, OrganizacionControllerActualizar, OrganizacionControllerEliminar],
  providers: [OrganizacionServicios],
  exports: [OrganizacionServicios]
})
export class OrganizacionModule {}

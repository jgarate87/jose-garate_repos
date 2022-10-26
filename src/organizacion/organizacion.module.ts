import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizacionControlador } from './controlador/organizacion.controller';
import { OrganizacionServicios } from './servicios/organizacion.service';
import { Organizacion } from './entidades/organizacion.entity';

import { Tribus } from '../tribus/entidades/tribus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organizacion,Tribus])],
  controllers: [OrganizacionControlador],
  providers: [OrganizacionServicios],
  exports: [OrganizacionServicios]
})
export class OrganizacionModule {}

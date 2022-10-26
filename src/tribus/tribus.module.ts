import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TribusControlador } from './controlador/tribus.controller';
import { TribusServicios } from './servicios/tribus.service';
import { Tribus } from './entidades/tribus.entity';
import { OrganizacionModule } from '../organizacion/organizacion.module'


@Module({
  imports: [OrganizacionModule,TypeOrmModule.forFeature([Tribus])],
  controllers: [TribusControlador],
  providers: [TribusServicios],
  exports: [TribusServicios]
})
export class TribusModule {}

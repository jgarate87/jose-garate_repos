import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MetricasControlador } from './controlador/metricas.controller';
import { MetricasServicios } from './servicios/metricas.service';
import { Metricas } from './entidades/metricas.entity';
import { RepositoriosModule } from '../repositorios/repositorios.module'

import { Tribus } from '../tribus/entidades/tribus.entity';


@Module({
  imports: [RepositoriosModule,TypeOrmModule.forFeature([Metricas,Tribus])],
  controllers: [MetricasControlador],
  providers: [MetricasServicios],
  exports: [MetricasServicios]

})
export class MetricasModule {}

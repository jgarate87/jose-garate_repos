import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoriosControlador } from './controlador/repositorios.controller';
import { RepositoriosMetricaControlador } from './controlador/repositoriosMetricas.controller';

import { RepositoriosService } from './servicios/repositorios.service';
import { Repositorios } from './entidades/repositorios.entity';
import { TribusModule } from '../tribus/tribus.module'
import { Tribus } from '../tribus/entidades/tribus.entity'
import { MetricasModule } from '../metricas/metricas.module'
import { HttpModule, HttpService } from '@nestjs/axios';




@Module({
  imports: [HttpModule, TribusModule, TypeOrmModule.forFeature([Repositorios, Tribus])],
  controllers: [RepositoriosControlador, RepositoriosMetricaControlador],
  providers: [RepositoriosService, HttpModule],
  exports: [RepositoriosService]
})
export class RepositoriosModule { }

import { enviroments } from './../enviroments';
import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'

import {OrganizacionModule} from './organizacion/organizacion.module'
import {TribusModule} from './tribus/tribus.module'
import {RepositoriosModule} from './repositorios/repositorios.module'
import {MetricasModule} from './metricas/metricas.module'
import { BaseDatosModule } from './baseDatos/baseDatos.module';

import config from './config';

@Module({
  imports: [ConfigModule.forRoot({
    //envFilePath: enviroments[process.env.NODE_ENV] || '.env',
    load: [config],
    isGlobal: true,
  }),
  BaseDatosModule,
  OrganizacionModule,
  TribusModule,
  RepositoriosModule,
  MetricasModule
  ],
  controllers: [],
})
export class AppModule {}

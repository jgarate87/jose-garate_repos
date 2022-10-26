import { enviroments } from './../enviroments';
import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { AppService } from './app.service';

import {OrganizacionModule} from './organizacion/organizacion.module'
import {TribusModule} from './tribus/tribus.module'
import {RepositoriosModule} from './repositorios/repositorios.module'
import {MetricasModule} from './metricas/metricas.module'
import { BaseDatosModule } from './baseDatos/baseDatos.module';

import config from './config';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: enviroments[process.env.NODE_ENV] || '.env',
    load: [config],
    isGlobal: true,
  }),
  BaseDatosModule,
  OrganizacionModule,
  TribusModule,
  RepositoriosModule,
  MetricasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

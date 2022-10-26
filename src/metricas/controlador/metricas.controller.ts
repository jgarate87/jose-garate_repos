import { Controller, Get, Query, Param, Body, Post, Put, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';

import { MetricasServicios } from '../servicios/metricas.service';
import { CrearMetricasDto, ActualizarMetricasDto } from '../dtos/metricas.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Entidad Metrics')
@Controller('metricas')
export class MetricasControlador {
  constructor(private metricasService: MetricasServicios) { }

  @Get()
  getMetrics() {
    return this.metricasService.findAll();
  }

  @Get(':metricId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('metricId') metricId: number) {
    return this.metricasService.findOne(metricId);
  }

  @Post()
  create(@Body() data: CrearMetricasDto) {
    return this.metricasService.create(data);
  }

  @Put(':metricId')
  update(@Param('metricId') metricId: number, @Body() data: ActualizarMetricasDto) {
    return this.metricasService.update(metricId, data);
  }

  @Delete(':metricId')
  delete(@Param('metricId') metricId: number) {
    return this.metricasService.remove(metricId);
  }

}

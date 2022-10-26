import {
    Controller,
    Get,
    Param,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
    StreamableFile,
    Res
  } from '@nestjs/common';
  
  import { createReadStream } from 'fs';
  
  
  import { join } from 'path';
  import type { Response } from 'express';
  
  import { RepositoriosService } from '../servicios/repositorios.service';
  import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Endpoint para obtener métricas y archivo .csv')
  @Controller('metadata')
  export class RepositoriosMetricaControlador {
    constructor(private repositoriosServicio: RepositoriosService) { }
  
    @Get('report/:tribuId')
    async getFile(@Param('tribuId') tribuId: number,@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
      await this.repositoriosServicio.generateReport(tribuId)
      const file = createReadStream(join(process.cwd(), 'report.csv'));
      res.set({
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="report.csv"',
      });
      return new StreamableFile(file);
    }
  
    @Get(':tribuId')
    @HttpCode(HttpStatus.ACCEPTED)
    getMetrics(@Param('tribuId') tribuId: number) {
      return this.repositoriosServicio .getMetrics(tribuId);
    }
  }
  
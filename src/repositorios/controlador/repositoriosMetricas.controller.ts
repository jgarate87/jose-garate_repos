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
  
  @ApiTags('Métricas y archivo .csv')
  @Controller('dashboard')
  export class RepositoriosMetricaControlador {
    constructor(private repositoriosServicio: RepositoriosService) { }
  
    @Get('csv/:tribuId')
    async getFile(@Param('tribuId') tribuId: number,@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
      await this.repositoriosServicio.generateReport(tribuId)
      const file = createReadStream(join(process.cwd(), 'reporte.csv'));
      res.set({
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="reporte.csv"',
      });
      return new StreamableFile(file);
    }
  
    @Get('Json/:tribuId')
    @HttpCode(HttpStatus.ACCEPTED)
    getMetrics(@Param('tribuId') tribuId: number) {
      return this.repositoriosServicio .getMetrics(tribuId);
    }
  }
  
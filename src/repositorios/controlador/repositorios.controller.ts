import { Controller, Get, Query, Param, Body, Post, Put, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';

import { RepositoriosService } from '../servicios/repositorios.service';
import { CrearRepositorioDto, ActualizarRepositorioDto } from '../dtos/repositorios.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Entidad Repositorios')
@Controller('repositorios')
export class RepositoriosControlador {
  constructor(private repositoriosServicio: RepositoriosService) { }

  @Get()
  getRepositories() {
    return this.repositoriosServicio.findAll();
  }

  @Get(':repoId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('repoId') repoId: number) {
    return this.repositoriosServicio.findOne(repoId);
  }

  @Post()
  create(@Body() data: CrearRepositorioDto) {
    return this.repositoriosServicio.create(data);
  }

  @Put(':repoId')
  update(@Param('repoId') repoId: number, @Body() data: ActualizarRepositorioDto) {
    return this.repositoriosServicio.update(repoId, data);
  }

  @Delete(':repoId')
  delete(@Param('repoId') repoId: number) {
    return this.repositoriosServicio.remove(repoId);
  }

}

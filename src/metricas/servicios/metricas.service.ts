import { Repositorios } from '../../repositorios/entidades/repositorios.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Metricas } from '../entidades/metricas.entity'
import { CrearMetricasDto,ActualizarMetricasDto} from '../dtos/metricas.dto';
import {RepositoriosService} from '../../repositorios/servicios/repositorios.service'

@Injectable()
export class MetricasServicios {
  constructor(
    @InjectRepository(Metricas) private metricasRepo:Repository<Metricas>,
    private RepositoriosService:RepositoriosService
  ){}


  async create(data: CrearMetricasDto) {
    const newMetrics = this.metricasRepo.create(data);

    const repositorio = await this.RepositoriosService.findOne(data.id_repository);
    if (!repositorio) {
      throw new NotFoundException(`repositorio #${data.id_repository} not found`);
    }
    newMetrics.repositorio =repositorio;

    return this.metricasRepo.save(newMetrics);
  }



  findAll() {
    //return this.organizations;
    return this.metricasRepo.find();
  }

  async findOne(id_repository: number) {
    const metrics = await this.metricasRepo.findOneBy({
      id_repository: id_repository
  });
    if (!metrics) {
      throw new NotFoundException(`Metric #${id_repository} not found`);
    }
    return metrics;
  }

  async update(id_repository: number, changes: ActualizarMetricasDto) {
    const metrics = await this.metricasRepo.findOneBy({
      id_repository: id_repository
  });
  if (!metrics) {
    throw new NotFoundException(`Metrics #${id_repository} not found`);
  }
    this.metricasRepo.merge(metrics, changes);
    return this.metricasRepo.save(metrics);
  }

  remove(id: number) {
    return this.metricasRepo.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Organizacion } from '../entidades/organizacion.entity'
import { CrearOrganizacionDto, ActualizarOrganizacionDto } from './../dtos/organizacion.dto';

@Injectable()
export class OrganizacionServicios {
  constructor(
    @InjectRepository(Organizacion) private organizacionRepo:Repository<Organizacion>,
  ){}


  create(data: CrearOrganizacionDto) {
    const newOrganizacion = this.organizacionRepo.create(data);
    return this.organizacionRepo.save(newOrganizacion);

  }

  findAll() {
   
    return this.organizacionRepo.find(
      {
        relations: ['tribes'],
      }
    );
  }

  async findOne(id: number) {
    const organizacion = await this.organizacionRepo.findOneBy({
      id: id
  });
    if (!organizacion) {
      throw new NotFoundException(`Organizacion #${id} not found`);
    }
    return organizacion;
  }


  async  update(id: number, changes: ActualizarOrganizacionDto) {
    const organizacion = await this.organizacionRepo.findOneBy({
      id: id
  });
  if (!organizacion) {
    throw new NotFoundException(`Organizacion #${id} not found`);
  }
    this.organizacionRepo.merge(organizacion, changes);
    return this.organizacionRepo.save(organizacion);
  }

  remove(id: number) {
    return this.organizacionRepo.delete(id);
  }
}

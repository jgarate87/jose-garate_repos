import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tribus } from '../entidades/tribus.entity'
import { CrearTribusDto,ActualizarTribusDto} from '../dtos/tribus.dto';
import { OrganizacionServicios } from '../../organizacion/servicios/organizacion.service'

@Injectable()
export class TribusServicios {
  constructor(
    @InjectRepository(Tribus) private tribeRepo:Repository<Tribus>,
    private organizacionServicios:OrganizacionServicios
  ){}


 async create(data: CrearTribusDto) {
    const newTribe = this.tribeRepo.create(data);
    const organizacion = await this.organizacionServicios.findOne(data.id_Organization);
    if (!organizacion) {
      throw new NotFoundException(`Repository #${data.id_Organization} not found`);
    }
    newTribe.organizacion =organizacion;
    return this.tribeRepo.save(newTribe);
  }

  findAll() {
    //return this.organizations;
    return this.tribeRepo.find({
      relations: ['organizacion','repositorios'],
    });
  }

  async findOne(id_tribu: number) {
    const tribu = await this.tribeRepo.findOne({
      where:{id_tribu: id_tribu},
      relations:['organizacion','repositorios']
    });

    return tribu;
  }

  async update(id_tribu: number, changes: ActualizarTribusDto) {
    const tribu = await this.tribeRepo.findOneBy({
      id_tribu: id_tribu
  });
  if (!tribu) {
    throw new NotFoundException(`tribu #${id_tribu} not found`);
  }
    this.tribeRepo.merge(tribu, changes);
    return this.tribeRepo.save(tribu);
  }

  remove(id: number) {
    return this.tribeRepo.delete(id);
  }
}

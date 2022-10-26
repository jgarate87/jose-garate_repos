import { Injectable, NotFoundException, Inject, StreamableFile, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository, MoreThan, Between } from 'typeorm';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import { parse } from 'json2csv';


import { Repositorios, repoEstados, registrarEstados } from '../entidades/repositorios.entity'
import { CrearRepositorioDto, ActualizarRepositorioDto } from '../dtos/repositorios.dto';

import { TribusServicios } from './../../tribus/servicios/tribus.service'
import { Tribus } from './../../tribus/entidades/tribus.entity'
import { json } from 'stream/consumers';


@Injectable()
export class RepositoriosService {
  constructor(
    @InjectRepository(Repositorios) private repositoriesRepo: Repository<Repositorios>,
    private tribusService: TribusServicios,
    private readonly httpService: HttpService
  ) { }


  async create(data: CrearRepositorioDto) {
    const newRepository = this.repositoriesRepo.create(data);
    if (data.tribeId) {
      const tribe = await this.tribusService.findOne(data.tribeId);
      newRepository.tribe = tribe;
    } else {
      throw new NotFoundException(`tribeId es requerido`);
    }
    return this.repositoriesRepo.save(newRepository);
  }

  findAll() {
    //return this.organizations;
    return this.repositoriesRepo.find({
      relations: ['tribe', 'metrics'],
    });
  }

  async findOne(id_repository: number) {
    const repository = await this.repositoriesRepo.findOne({
      where: { id_repository: id_repository },
      relations: ['tribe', 'metrics']
    });
    if (!repository) {
      throw new NotFoundException(`Repository #${id_repository} no se encuentra`);
    }
    return repository;
  }



  async update(id_repository: number, changes: ActualizarRepositorioDto) {
    const repository = await this.repositoriesRepo.findOneBy({
      id_repository: id_repository
    });
    if (!repository) {
      throw new NotFoundException(`Repository #${id_repository} no se encuentra`);
    }
    if (changes.tribeId) {
      const tribe = await this.tribusService.findOne(changes.tribeId);
      repository.tribe = tribe;
    }

    this.repositoriesRepo.merge(repository, changes);
    return this.repositoriesRepo.save(repository);
  }

  remove(id: number) {
    return this.repositoriesRepo.delete(id);
  }

  async getVerificationState(idRepository: number) {
    let naturalLanguageState: string = 'No encontrado'
    const verificationCode = [
      //{ code: 0, state: "No encontrado" },
      { code: 604, state: "Verificado" },
      { code: 605, state: "En espera" },
      { code: 606, state: "Aprobado" },
    ]

    try {
      const APIMock: any = await this.httpService.get(process.env.MOCK_API).toPromise()
      const dataMock: any = APIMock.data
      const searchMock: number = dataMock?.find((repo) => repo.id == idRepository)?.state || 0
      naturalLanguageState = verificationCode.find((code) => code.code == searchMock)?.state || "No encontrado"
    } catch (error) {
      naturalLanguageState = 'NO_API'
    }

    return naturalLanguageState;
  }

  async getMetrics(idTribu: number) {

    interface ModelResponse {
      id: number;
      name: string;
      tribe: string;
      organization: string;
      coverage: string;
      codeSmells: number;
      bugs: number;
      vulnerabilities: number;
      hotspots: number;
      verificationState: string;
      state: string;
    }

    const stateCode = [
      { code: "E", state: "Enable" },
      { code: "D", state: "Disable" },
      { code: "A", state: "Archived" },
    ]

    const minCoverage: number = 75;
    const thisYear: number = new Date().getFullYear()
    const dateFrom: Date = new Date(thisYear, 1, 1)
    const dateTo: Date = new Date(thisYear, 12, 31)


    const tribe = await this.tribusService.findOne(idTribu);
    if (!tribe) {
      throw new NotFoundException(`La Tribu no se encuentra registrada`);
    }

    const metricas: Repositorios[] = await this.repositoriesRepo.find({
      relations: ['tribe', 'metrics', 'tribe.organizacion'],
      select: {
        id_repository: true,
        name: true,
        tribe: {
          name: true,
          organizacion: {
            name: true,
          }
        },
        metrics: {
          coverage: true,
          code_smells: true,
          bugs: true,
          vulnerabilities: true,
          hostpot: true,
        },
        state: true,
        create_time: true,
      },
      where: {
        create_time: Between(dateFrom, dateTo),
        tribe: {
          id_tribu: idTribu,
        },
        metrics: {
          coverage: MoreThan(minCoverage),
        },
        state: repoEstados.ENABLE,
      }
    })

    if (!metricas) {
      throw new NotFoundException(`La Tribu no tiene repositorios que cumplan con la cobertura necesaria`);
    }

    var modelResponse: ModelResponse[] = [];
    await Promise.all(
      metricas.map(async repo => {
        const data = JSON.parse(JSON.stringify(repo)); 
    
        const stateRepo = await this.getVerificationState(data.id_repository)
        let datamodel: ModelResponse = {
          id: data.id_repository,
          name: data.name,
          tribe: data.tribe.name,
          organization: data.tribe.organizacion.name,
          coverage: `${data.metrics.coverage}%`,
          codeSmells: +data.metrics.code_smells,
          bugs: +data.metrics.bugs,
          vulnerabilities: +data.metrics.vulnerabilities,
          hotspots: +data.metrics.hostpot,
          verificationState: stateRepo,
          state: stateCode.find((code) => code.code == data.state)?.state,
        }
        console.log(datamodel);

        modelResponse.push(datamodel)
      }))

    const response = JSON.parse(JSON.stringify(modelResponse))
    return response
  }

  async generateReport(idTribu: number) {

    const fileReport: string = 'reporte.csv';
    const logger = fs.createWriteStream('reporte.csv', { flags: 'w' })

    logger.write(`Tribu ID: ${idTribu}\n`)
    logger.write(`id,Nombre Repositorio,Tribu,Organización,coverage,codeSmells,bugs,vulnerabilities,hotspots,verificationState,state\n`)

    const metrics: any = await this.getMetrics(idTribu) || [];
    metrics.map((item) => {
      logger.write(`${item.id},${item.name},${item.tribe},${item.organization},${item.coverage},${item.codeSmells},${item.bugs},${item.vulnerabilities},${item.hotspots},${item.verificationState},${item.state}\n`)
    })

    return fileReport

  }

}

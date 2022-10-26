import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne
  } from 'typeorm';
  
  import { Metricas } from '../../metricas/entidades/metricas.entity'
  import { Tribus } from '../../tribus/entidades/tribus.entity'
  import { Exclude, Expose } from "class-transformer";
  
  export enum repoEstados {
    ENABLE = 'E',
    DISABLE = 'D',
    ARCHIVED = 'A'
  }
  
  export enum registrarEstados {
    ACTIVE = 'A',
    INACTIVE = 'I',
  }
  
  
  @Entity()
  export class Repositorios {
    @PrimaryGeneratedColumn()
    id_repository: number;
  
    @Column({ type: 'varchar', length: 50 })
    name: string;
  
    //@Column({ type: "enum", enum: repoStates , default: repoStates.ENABLE })
    @Column({ type: 'varchar', length: 1, default: repoEstados.ENABLE })
    state: repoEstados;
    @CreateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    create_time: Date;
    @Column({ type: 'varchar', length: 1, default: registrarEstados.ACTIVE })
     status: registrarEstados;
  
    @OneToOne(() => Metricas,(metricas) => metricas.repositorio)
    @JoinColumn()
    metrics: Metricas
  
    @ManyToOne(() => Tribus, (tribu) => tribu.repositorios)
    tribe: Tribus
  
  
  
  }
  
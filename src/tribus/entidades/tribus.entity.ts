import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    OneToMany,
    ManyToOne
  } from 'typeorm';
  
  import { Repositorios } from '../../repositorios/entidades/repositorios.entity'
  import { Organizacion } from '../../organizacion/entidades/organizacion.entity'
  
  @Entity()
  export class Tribus {
    @PrimaryGeneratedColumn()
    id_tribu: number;
  
    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;
  
    @Column({ type: 'int' })
    status: number;
  
    @OneToMany(() => Repositorios, (repositorios) => repositorios.tribe)
    repositorios: Repositorios[]
  
    @ManyToOne(() => Organizacion, (organizacion) => organizacion.tribes)
    organizacion: Organizacion
  }
  
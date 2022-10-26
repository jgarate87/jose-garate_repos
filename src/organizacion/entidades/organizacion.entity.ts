import { PrimaryGeneratedColumn, Column, Entity,OneToMany } from 'typeorm';

import { Tribus } from '../../tribus/entidades/tribus.entity'

@Entity()
export class Organizacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'int' })
  status: number;

  @OneToMany(() => Tribus, (tribu) => tribu.organizacion)
  tribes: Tribus[]
}

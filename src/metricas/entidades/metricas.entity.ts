import { Column, Entity,PrimaryColumn ,OneToOne,} from 'typeorm';

import { Repositorios } from '../../repositorios/entidades/repositorios.entity'
@Entity()
export class Metricas {
  @PrimaryColumn()
  id_repository: number;

  @Column({type: "decimal", precision: 2, default: 0})
  coverage: number

  @Column({ type: 'int' })
  bugs: number;

  @Column({ type: 'int' })
  vulnerabilities: number;

  @Column({ type: 'int' })
  hostpot: number;

  @Column({ type: 'int' })
  code_smells: number;

  @OneToOne(() => Repositorios, (repository) => repository.metrics) // specify inverse side as a second parameter
  repositorio: Repositorios

}

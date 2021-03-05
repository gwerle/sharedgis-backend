import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Map from './Map';

type SurfaceSituation =
  | 'EXCELENT'
  | 'GOOD'
  | 'INTERMEDIATE'
  | 'BAD'
  | 'VERY_BAD'
  | 'HORRIBLE'
  | 'VERY_HORRIBLE'
  | 'IMPASSABLE';

type BicyclePathType =
  | 'CICLOVIA'
  | 'CICLOROTA'
  | 'CICLOFAIXA'
  | 'COMPARTILHADA';

@Entity('bicycle_path')
class BicyclePath {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Map)
  @JoinColumn({ name: 'id' })
  map: Map;

  @Column({
    name: 'surface_situation',
    type: 'enum',
    enum: [
      'EXCELENT',
      'GOOD',
      'INTERMEDIATE',
      'BAD',
      'VERY_BAD',
      'HORRIBLE',
      'VERY_HORRIBLE',
      'IMPASSABLE',
    ],
  })
  surface_situation: SurfaceSituation;

  @Column({
    name: 'bicycle_path_type',
    type: 'enum',
    enum: ['CICLOVIA', 'CICLORROTA', 'CICLOFAIXA', 'COMPARTILHADA'],
  })
  bicycle_path_type: BicyclePathType;

  @Column()
  notes: string;

  @Column()
  geom: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BicyclePath;

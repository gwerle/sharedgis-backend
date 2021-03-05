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

type Surface =
  | 'ASPHALT'
  | 'CONCRETE'
  | 'INTERMEDIATE'
  | 'SETT'
  | 'GROUND'
  | 'GRASS';

type TacticlePavingSituation = 'GOOD' | 'MEDIUM' | 'BAD';

@Entity('sidewalk')
class Sidewalk {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Map)
  @JoinColumn({ name: 'id' })
  map: Map;

  @Column({
    name: 'surface',
    type: 'enum',
    enum: ['ASPHALT', 'CONCRETE', 'INTERMEDIATE', 'SETT', 'GROUND', 'GRASS'],
  })
  surface: Surface;

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

  @Column()
  width: number;

  @Column()
  have_tacticle_paving: boolean;

  @Column()
  have_contrasted_tacticle_paving: boolean;

  @Column()
  tacticle_paving_color: string;

  @Column({
    name: 'tacticle_paving_situation',
    type: 'enum',
    enum: ['GOOD', 'MEDIUM', 'BAD'],
  })
  tacticle_paving_situation: TacticlePavingSituation;

  @Column()
  notes: string;

  @Column()
  geom: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sidewalk;

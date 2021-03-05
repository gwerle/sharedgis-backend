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

type BikeRacksConditions = 'GOOD' | 'MEDIUM' | 'BAD';

@Entity('bike_park')
class BikePark {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Map)
  @JoinColumn({ name: 'id' })
  map: Map;

  @Column({
    name: 'bike_racks_conditions',
    type: 'enum',
    enum: ['GOOD', 'MEDIUM', 'BAD'],
  })
  bike_racks_conditions: BikeRacksConditions;

  @Column()
  notes: string;

  @Column()
  geom: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BikePark;

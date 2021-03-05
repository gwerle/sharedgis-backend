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

@Entity('taxi_stop')
class TaxiStop {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Map)
  @JoinColumn({ name: 'id' })
  map: Map;

  @Column()
  have_seats: boolean;

  @Column()
  have_visual_notification: boolean;

  @Column()
  have_sound_notification: boolean;

  @Column()
  accessible_to_wheelchair: boolean;

  @Column()
  notes: string;

  @Column()
  geom: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TaxiStop;

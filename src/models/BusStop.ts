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

@Entity('bus_stop')
class BusStop {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Map)
  @JoinColumn({ name: 'id' })
  map: Map;

  @Column()
  accessible_to_wheelchair: boolean;

  @Column()
  have_visual_notification: boolean;

  @Column()
  have_sound_notification: boolean;

  @Column()
  rain_covered: boolean;

  @Column()
  have_bus_lines_demonstrations: boolean;

  @Column()
  have_seats: boolean;

  @Column()
  notes: string;

  @Column()
  geom: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BusStop;

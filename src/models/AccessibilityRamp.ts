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

type Inclination = 'LOW' | 'MEDIUM' | 'HIGH';

@Entity('accessibility_ramp')
class AccessibilityRamp {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'inclination',
    type: 'enum',
    enum: ['LOW', 'MEDIUM', 'HIGH'],
  })
  inclination: Inclination;

  @ManyToOne(() => Map)
  @JoinColumn({ name: 'id' })
  map: Map;

  @Column()
  have_vision_notification: boolean;

  @Column()
  geom: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AccessibilityRamp;

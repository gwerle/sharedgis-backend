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

type RoadWay = 'ONE_WAY' | 'BOTH_WAY';
type Slope = 'LOW' | 'MEDIUM' | 'HIGH';
type RoadCondition = 'EXCELENT' | 'GOOD' | 'INTERMEDIATE' | 'HORRIBLE';

@Entity('roads')
class Roads {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Map)
  @JoinColumn({ name: 'id' })
  map: Map;

  @Column({ name: 'way', type: 'enum', enum: ['ONE_WAY', 'BOTH_WAY'] })
  way: RoadWay;

  @Column({ name: 'slope', type: 'enum', enum: ['LOW', 'MEDIUM', 'HIGH'] })
  slope: Slope;

  @Column()
  paved: boolean;

  @Column({
    name: 'road_condition',
    type: 'enum',
    enum: ['EXCELENT', 'GOOD', 'INTERMEDIATE', 'HORRIBLE'],
  })
  road_condition: RoadCondition;

  @Column()
  have_bus_lines: boolean;

  @Column()
  geom: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Roads;

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import User from './User';

@Entity('maps')
class Map {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  map_name: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner' })
  user: User;

  @Column()
  owner: string;

  @Column()
  description: string;

  @ManyToMany(() => User)
  @JoinTable({ name: 'users_maps' })
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Map;

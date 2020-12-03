import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from './User';
import UsersMaps from './UserMaps';

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

  @OneToMany(() => UsersMaps, usersMaps => usersMaps.map_id)
  users_maps: UsersMaps[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Map;

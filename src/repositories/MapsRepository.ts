import { EntityRepository, Repository } from 'typeorm';
import Map from '../models/Map';

@EntityRepository(Map)
class MapsRepository extends Repository<Map> {
  public async getByUserId(userId: string): Promise<Map[] | null> {
    const getAll = await this.find({
      relations: ['users'],
    });

    const byUser = getAll.filter(item => {
      return item.users.some(user => user.id === userId);
    });

    return byUser || null;
  }
}

export default MapsRepository;

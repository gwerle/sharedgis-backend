import { EntityRepository, Repository } from 'typeorm';
import Map from '../models/Map';

@EntityRepository(Map)
class MapsRepository extends Repository<Map> {
  public async getByUserId(userId: string): Promise<Map[] | null> {
    const getAll = await this.find({
      relations: ['users'],
    });

    const mapsByUser = getAll.filter(item => {
      return item.users.some(user => user.id === userId);
    });

    // eslint-disable-next-line no-param-reassign
    mapsByUser.forEach(i => delete i.users);

    return mapsByUser || null;
  }
}

export default MapsRepository;

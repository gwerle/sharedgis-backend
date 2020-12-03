import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsersMaps1606959149368
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_maps',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'map_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'UserId',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            name: 'MapId',
            columnNames: ['map_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'maps',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_maps');
  }
}

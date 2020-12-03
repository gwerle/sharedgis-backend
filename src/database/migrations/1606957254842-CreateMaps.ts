import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMaps1606957254842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'maps',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'map_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'owner',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('maps');
  }
}

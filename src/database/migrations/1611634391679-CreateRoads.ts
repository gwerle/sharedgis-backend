import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRoads1611634391679 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roads',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'map_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'way',
            type: 'enum',
            enum: ['ONE_WAY', 'BOTH_WAY'],
            isNullable: true,
          },
          {
            name: 'slope',
            type: 'enum',
            enum: ['LOW', 'MEDIUM', 'HIGH'],
            isNullable: true,
          },
          {
            name: 'paved',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'road_condition',
            type: 'enum',
            enum: ['EXCELENT', 'GOOD', 'INTERMEDIATE', 'HORRIBLE'],
            isNullable: true,
          },
          {
            name: 'have_bus_lines',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'geom',
            type: 'geography',
            spatialFeatureType: 'Linestring',
            srid: 4326,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roads');
  }
}

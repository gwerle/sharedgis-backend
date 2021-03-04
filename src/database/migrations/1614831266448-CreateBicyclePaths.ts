import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateBicyclePaths1614831266448
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bicycle_paths',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'map_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'surface_situation',
            enum: [
              'EXCELENT',
              'GOOD',
              'INTERMEDIATE',
              'BAD',
              'VERY_BAD',
              'HORRIBLE',
              'VERY_HORRIBLE',
              'IMPASSABLE',
            ],
            type: 'enum',
            isNullable: true,
          },
          {
            name: 'bicycle_path_type',
            enum: ['CICLOVIA', 'CICLORROTA', 'CICLOFAIXA', 'COMPARTILHADA'],
            type: 'enum',
            isNullable: true,
          },
          {
            name: 'notes',
            type: 'varchar',
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

    await queryRunner.createForeignKey(
      'bicycle_paths',
      new TableForeignKey({
        name: 'BicyclePathsMaps',
        columnNames: ['map_id'],
        referencedTableName: 'maps',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('bicycle_paths', 'BicyclePathsMaps');
    await queryRunner.dropTable('bicycle_paths');
  }
}

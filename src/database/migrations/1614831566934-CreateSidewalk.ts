import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateSidewalk1614831566934 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sidewalks',
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
            name: 'surface',
            enum: [
              'ASPHALT',
              'CONCRETE',
              'SETT',
              'COMPACTED',
              'GROUND',
              'GRASS',
            ],
            type: 'enum',
            isNullable: true,
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
            name: 'width',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'have_tacticle_paving',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'have_contrasted_tacticle_paving',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'tacticle_paving_color',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tacticle_paving_situation',
            enum: ['GOOD', 'MEDIUM', 'BAD'],
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
      'sidewalks',
      new TableForeignKey({
        name: 'SidewalksMaps',
        columnNames: ['map_id'],
        referencedTableName: 'maps',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sidewalks', 'SidewalksMaps');
    await queryRunner.dropTable('sidewalks');
  }
}

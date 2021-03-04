import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTrafficLight1614829229667
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'traffic_lights',
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
            name: 'have_sound_notification',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'have_crosswalk',
            type: 'boolean',
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
            spatialFeatureType: 'Point',
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
      'traffic_lights',
      new TableForeignKey({
        name: 'TrafficLightsMaps',
        columnNames: ['map_id'],
        referencedTableName: 'maps',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('traffic_lights', 'TrafficLightsMaps');
    await queryRunner.dropTable('traffic_lights');
  }
}

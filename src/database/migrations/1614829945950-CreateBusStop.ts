import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateBusStop1614829945950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bus_stops',
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
            name: 'accessible_to_wheelchair',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'have_visual_notification',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'have_sound_notification',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'rain_covered',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'have_bus_lines_demonstrations',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'have_seats',
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
      'bus_stops',
      new TableForeignKey({
        name: 'BusStopsMaps',
        columnNames: ['map_id'],
        referencedTableName: 'maps',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('bus_stops', 'BusStopsMaps');
    await queryRunner.dropTable('bus_stops');
  }
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTrainCross1614827772820
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'train_cross',
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
            name: 'have_visual_alert',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'have_sound_alert',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'have_far_visibility_of_the_train_line',
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
      'train_cross',
      new TableForeignKey({
        name: 'TrainCrossMaps',
        columnNames: ['map_id'],
        referencedTableName: 'maps',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('train_cross', 'TrainCrossMaps');
    await queryRunner.dropTable('train_cross');
  }
}

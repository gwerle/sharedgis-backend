import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddForeignKeyIntoMaps1606958235810
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'maps',
      new TableForeignKey({
        name: 'MapsUsers',
        columnNames: ['owner'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('maps', 'MapsUsers');
  }
}

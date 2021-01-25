import { MigrationInterface, QueryRunner } from 'typeorm';

export default class MapsUsersRelation1611549453668
  implements MigrationInterface {
  name = 'MapsUsersRelation1611549453668';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "maps" DROP CONSTRAINT "MapsUsers"`);
    await queryRunner.query(
      `CREATE TABLE "users_maps" ("mapsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_0031b483db2a319c15df86b0cbd" PRIMARY KEY ("mapsId", "usersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a8a39f755affb278c9d100add1" ON "users_maps" ("mapsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_32035ece979ec98b062fce01fe" ON "users_maps" ("usersId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "maps" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "maps" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "maps" ALTER COLUMN "owner" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "maps" ADD CONSTRAINT "FK_2840fb8316357cbf6c5545548c9" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_maps" ADD CONSTRAINT "FK_a8a39f755affb278c9d100add13" FOREIGN KEY ("mapsId") REFERENCES "maps"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_maps" ADD CONSTRAINT "FK_32035ece979ec98b062fce01feb" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_maps" DROP CONSTRAINT "FK_32035ece979ec98b062fce01feb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_maps" DROP CONSTRAINT "FK_a8a39f755affb278c9d100add13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "maps" DROP CONSTRAINT "FK_2840fb8316357cbf6c5545548c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "maps" ALTER COLUMN "owner" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "maps" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "maps" DROP COLUMN "created_at"`);
    await queryRunner.query(`DROP INDEX "IDX_32035ece979ec98b062fce01fe"`);
    await queryRunner.query(`DROP INDEX "IDX_a8a39f755affb278c9d100add1"`);
    await queryRunner.query(`DROP TABLE "users_maps"`);
    await queryRunner.query(
      `ALTER TABLE "maps" ADD CONSTRAINT "MapsUsers" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}

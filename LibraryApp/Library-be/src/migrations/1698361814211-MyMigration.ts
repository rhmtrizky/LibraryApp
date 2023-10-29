import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1698361814211 implements MigrationInterface {
    name = 'MyMigration1698361814211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_3c785ec557249db94d288a5d293"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "UQ_3c785ec557249db94d288a5d293"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "members" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "members" ADD "usersId" integer`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "UQ_3c785ec557249db94d288a5d293" UNIQUE ("usersId")`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_3c785ec557249db94d288a5d293" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}

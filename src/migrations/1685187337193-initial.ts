import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1685187337193 implements MigrationInterface {
    name = 'Initial1685187337193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "information" character varying NOT NULL, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tours" ("id" SERIAL NOT NULL, "tour_name" character varying NOT NULL, "date_start" TIMESTAMP NOT NULL, "date_end" TIMESTAMP NOT NULL, "people_amount" integer NOT NULL, "countryId" integer, CONSTRAINT "PK_2202ba445792c1ad0edf2de8de2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sales" ("id" SERIAL NOT NULL, "sale_date" TIMESTAMP NOT NULL, "tourId" integer, "clientId" integer, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "email_address" character varying NOT NULL, "phone_number" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tours" ADD CONSTRAINT "FK_1ea080456806b56b102967bd511" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_b18407a2cadbb9307d6f55d4497" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_c0ae0d7fce67f97394e3a250a33" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_c0ae0d7fce67f97394e3a250a33"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_b18407a2cadbb9307d6f55d4497"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP CONSTRAINT "FK_1ea080456806b56b102967bd511"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "sales"`);
        await queryRunner.query(`DROP TABLE "tours"`);
        await queryRunner.query(`DROP TABLE "countries"`);
    }

}

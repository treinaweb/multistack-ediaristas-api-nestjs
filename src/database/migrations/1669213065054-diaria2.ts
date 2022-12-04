import { MigrationInterface, QueryRunner } from 'typeorm';

export class diaria21669213065054 implements MigrationInterface {
  name = 'diaria21669213065054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diaria\` CHANGE \`complemento\` \`complemento\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diaria\` CHANGE \`complemento\` \`complemento\` varchar(255) NOT NULL`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class diaria1669211069576 implements MigrationInterface {
  name = 'diaria1669211069576';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`diaria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data_atendimento\` datetime NOT NULL, \`tempo_atendimento\` int NOT NULL, \`status\` int NOT NULL, \`preco\` int NOT NULL, \`valor_comissao\` int NOT NULL, \`logradouro\` varchar(255) NOT NULL, \`numero\` int NOT NULL, \`bairro\` varchar(255) NOT NULL, \`complemento\` varchar(255) NOT NULL, \`cidade\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, \`cep\` varchar(255) NOT NULL, \`codigo_ibge\` varchar(255) NOT NULL, \`quantidade_quartos\` int NOT NULL, \`quantidade_salas\` int NOT NULL, \`quantidade_cozinhas\` int NOT NULL, \`quantidade_banheiros\` int NOT NULL, \`quantidade_quintais\` int NOT NULL, \`quantidade_outros\` int NOT NULL, \`observacoes\` varchar(255) NULL, \`motivo_cancelamento\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cliente_id\` int NOT NULL, \`diarista_id\` int NULL, \`servico_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`diaria_candidato\` (\`diaria_id\` int NOT NULL, \`usuario_api_id\` int NOT NULL, INDEX \`IDX_fd9247286d049934078c05d91a\` (\`diaria_id\`), INDEX \`IDX_40b864ea45b69ec02acd5c152e\` (\`usuario_api_id\`), PRIMARY KEY (\`diaria_id\`, \`usuario_api_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria\` ADD CONSTRAINT \`FK_c56ef36204dc70df6bd89952fcd\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria\` ADD CONSTRAINT \`FK_c6be57059c27ed5e34f66fc6da6\` FOREIGN KEY (\`diarista_id\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria\` ADD CONSTRAINT \`FK_5e1094dcfc8b8eff8ed9602bdb2\` FOREIGN KEY (\`servico_id\`) REFERENCES \`servico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` ADD CONSTRAINT \`FK_fd9247286d049934078c05d91af\` FOREIGN KEY (\`diaria_id\`) REFERENCES \`diaria\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` ADD CONSTRAINT \`FK_40b864ea45b69ec02acd5c152e5\` FOREIGN KEY (\`usuario_api_id\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` DROP FOREIGN KEY \`FK_40b864ea45b69ec02acd5c152e5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria_candidato\` DROP FOREIGN KEY \`FK_fd9247286d049934078c05d91af\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria\` DROP FOREIGN KEY \`FK_5e1094dcfc8b8eff8ed9602bdb2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria\` DROP FOREIGN KEY \`FK_c6be57059c27ed5e34f66fc6da6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diaria\` DROP FOREIGN KEY \`FK_c56ef36204dc70df6bd89952fcd\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_40b864ea45b69ec02acd5c152e\` ON \`diaria_candidato\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fd9247286d049934078c05d91a\` ON \`diaria_candidato\``,
    );
    await queryRunner.query(`DROP TABLE \`diaria_candidato\``);
    await queryRunner.query(`DROP TABLE \`diaria\``);
  }
}

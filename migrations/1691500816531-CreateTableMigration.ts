import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMigration1691500816531 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Pokemon',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'attack',
            type: 'int',
          },
          {
            name: 'defense',
            type: 'int',
          },
          {
            name: 'health',
            type: 'int',
          },
        ],
      }),
      true,
    );

    console.log('migration done');
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Pokemon');
  }
}

import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';

@Injectable()
export class MigrationService {
  private connection: Connection;

  async runMigrations() {
    console.log('inside migration Service');
    if (!this.connection) {
      this.connection = await createConnection();
    }

    await this.connection.runMigrations({
      transaction: 'all',
    });
  }
}

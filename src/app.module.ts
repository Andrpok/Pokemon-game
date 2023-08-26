import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { Pokemon } from './entities/pokemon.entity';
import { MigrationService } from './services/migration';

const Client = require('prom-client');
@Module({
  imports: [
    PokemonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'Andy',
      password: '123456',
      database: 'Pokemon_database', // Имя базы данных
      entities: [Pokemon],
      //migrationsTableName: 'migrations',
      //migrations: ['./migrations'],
      // synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MigrationService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly migrationService: MigrationService) {}
  public onModuleInit(): any {
    Client.collectDefaultMetrics();
    this.migrationService.runMigrations();
  }
}

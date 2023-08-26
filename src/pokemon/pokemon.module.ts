import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from '../entities/pokemon.entity';
import { CacheService } from '../services/cache';
import { ApiPokemonService } from './api.pokemon.service';
import { DataPokemonService } from './data.pokemon.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  controllers: [PokemonController],
  providers: [
    PokemonService,
    CacheService,
    ApiPokemonService,
    DataPokemonService,
  ],
})
export class PokemonModule {}

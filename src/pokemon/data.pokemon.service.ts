import { Injectable } from '@nestjs/common';
import { Pokemon } from '../entities/pokemon.entity';
import { PokemonService } from './pokemon.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../services/cache';

@Injectable()
export class DataPokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
    private cacheService: CacheService,
  ) {}
  private cache_prefix = 'pokemon_';
  public async findOne(id: number, forceRefresh = false): Promise<any> {
    let data;

    if (!forceRefresh) {
      data = this.findOneCache(id);
      if (data) return data;
    }

    data = await this.findOneMysql(id);
    if (data) this.setToCache(id, data);

    return data;
  }
  public async deleteOne(id: number, forceRefresh = false): Promise<any> {
    let data;
    if (!forceRefresh) {
      data = this.findOneCache(id);
      if (data) {
        this.cacheService.delete(data);
      }
    }
    data = await this.findOneMysql(id);
    if (data) this.pokemonRepository.delete(id);
    return data;
  }
  private findOneCache(key) {
    return this.cacheService.get(this.cache_prefix + key);
  }
  private setToCache(key, value) {
    this.cacheService.set(this.cache_prefix + key, value);
    console.log(this.findOneCache(key));
  }
  private async findOneMysql(id: number) {
    let result = {};
    try {
      result = await this.pokemonRepository.findOneById(id);
    } catch (e) {
      // place to write logs
      return null;
    }

    return result;
  }
}

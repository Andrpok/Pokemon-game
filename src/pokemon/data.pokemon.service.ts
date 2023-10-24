import { Injectable, Inject } from '@nestjs/common';
import { Pokemon } from '../entities/pokemon.entity';
import { PokemonService } from './pokemon.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../services/cache';
import * as Redis from 'ioredis';

@Injectable()
export class DataPokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis.Redis,
    private cacheService: CacheService,
  ) {}
  private cache_prefix = 'pokemon_';
  public async findOne(id: number, forceRefresh = false): Promise<any> {
    let data;

    if (!forceRefresh) {
      data = await this.findOneCache(id);
      if (data) return data;
    }

    data = await this.findOneMysql(id);
    console.log('after mysql')
    console.log(data)
    if (data) {
      this.setToCache(id, data);
      await this.redisClient.set("" + id, JSON.stringify(data));
    }

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
  private async findOneCache(key) {
    const cacheService = CacheService.getInstance();

    const redisData = await this.redisClient.get(key);
    console.log(`redis key: ${key}`);
    console.log(redisData);
    return cacheService.get(this.cache_prefix + key);
    // return this.cacheService.get(this.cache_prefix + key);
  }
  private setToCache(key, value) {
    // this.cacheService.set(this.cache_prefix + key, value);
    const cacheService = CacheService.getInstance();
    cacheService.set(this.cache_prefix + key, value);
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

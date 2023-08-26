import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from '../entities/pokemon.entity';
import { Repository } from 'typeorm';
import { CacheService } from '../services/cache';
import { DataPokemonService } from './data.pokemon.service';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
    private cacheService: CacheService,
    private dataService: DataPokemonService,
  ) {}
  async getCache(): Promise<any> {
    const cacheService = CacheService.getInstance();
    return cacheService.showAll();
  }
  async create(pokemon: Pokemon): Promise<any> {
    return await this.pokemonRepository.insert(pokemon);
  }
  async findOne(id: number): Promise<any> {
    return this.dataService.findOne(id);
  }
  async updateOne(id: number, pokemon: Pokemon): Promise<any> {
    return await this.pokemonRepository.update(id, pokemon);
  }
  async deleteOne(id: number): Promise<any> {
    return this.dataService.deleteOne(id);
    // return await this.pokemonRepository.delete(id);
  }
  async findAll(): Promise<any> {
    return await this.pokemonRepository.find();
  }
}

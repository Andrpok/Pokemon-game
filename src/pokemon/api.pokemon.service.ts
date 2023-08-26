import { Injectable } from '@nestjs/common';
import { Pokemon } from '../entities/pokemon.entity';
import { PokemonService } from './pokemon.service';
import { CacheService } from '../services/cache';

@Injectable()
export class ApiPokemonService {
  constructor(private pokemonService: PokemonService) {}

  // async getCache(): Promise<any> {
  //   return this.cacheService.showAll();
  // }
  async findOne(id: number): Promise<any> {
    // const cacheService = CacheService.getInstance();
    const response = {
      success: true,
      data: [],
      error: null,
    };
    if (isNaN(id)) {
      response.success = false;
      response.error = 'no data';

      return response;
    }

    const result = await this.pokemonService.findOne(id);
    if (result) {
      response.data.push(result);
    } else {
      response.success = false;
      response.error = 'no data';
    }

    return response;
  }
}

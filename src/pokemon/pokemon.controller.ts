import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { PokemonData, Checklenght } from 'Functions/Function.pokemon.data';
import { PokemonService } from './pokemon.service';
import { ApiPokemonService } from './api.pokemon.service';
import { Counter, Histogram, register } from 'prom-client';
import axios from 'axios';
import { CacheService } from '../services/cache';
@Controller('pokemon')
export class PokemonController {
  private reqCounter: Counter;
  private reqHistogram: Histogram;
  constructor(
    private pokemonService: PokemonService,
    private apiService: ApiPokemonService,
  ) {
    this.reqCounter = new Counter({
      name: 'number_requests_for_pokemon',
      help: 'Total number of requests to /pokemon/id',
    });
    register.registerMetric(this.reqCounter);
    this.reqHistogram = new Histogram({
      name: 'duration_requests_for_pokemon',
      help: 'Duration of requests to /pokemon/id',
      buckets: [0.1, 0.5, 1, 2, 5],
    });
    register.registerMetric(this.reqCounter);
    register.registerMetric(this.reqHistogram);
  }
  @Post()
  async create(@Body() Pokemon): Promise<any> {
    return this.pokemonService.create(Pokemon);
  }
  @Get()
  async findAll(): Promise<any> {
    return this.pokemonService.findAll();
  }
  @Get('cache')
  async getCache(): Promise<any> {
    return this.pokemonService.getCache();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.apiService.findOne(id);
    // const cacheService = CacheService.getInstance();
    // cacheService.set(555, 'CACHED');
    // const result = await this.apiService.findOne(id);
    // if (id == 9) {
    //   const myPromise = new Promise((resolve) => {
    //     setTimeout(async () => {
    //       resolve('done');
    //     }, 5000);
    //   });
    //   await myPromise.then();
    // }
    // return result;
  }

  // @Get('4pokemons/find')
  // async findFourPokemons(): Promise<any[]> {
  //   const req = [
  //     axios.get(`http://localhost:3000/pokemon/${8}`),
  //     axios.get(`http://localhost:3000/pokemon/${9}`),
  //     axios.get(`http://localhost:3000/pokemon/${10}`),
  //     axios.get(`http://localhost:3000/pokemon/${11}`),
  //   ];
  //   const res = await Promise.all(req);
  //   const dat = res.map((resp) => resp.data.data[0]);
  //   return dat;
  // }
  // @Get('1pokemon/find')
  // async findOnePokemon(): Promise<any> {
  //   const req = [
  //     axios.get(`http://localhost:3000/pokemon/${9}`),
  //     axios.get(`http://localhost:3000/pokemon/${8}`),
  //     axios.get(`http://localhost:3000/pokemon/${10}`),
  //     axios.get(`http://localhost:3000/pokemon/${11}`),
  //   ];
  //   const res = await Promise.race(req);
  //   console.log(res);
  //   try {
  //     return res.data.data[0];
  //   } catch (e) {
  //     return;
  //   }
  // }
  // @Get('pokemons/find3of4')
  // async findThreeoffour(): Promise<any[]> {
  //   const globalResult = [];
  //   const mainPromise = new Promise(async (resolveMain) => {
  //     const promises = [];
  //     let i;
  //
  //     for (i = 8; i <= 11; i++) {
  //       const tempPromise = new Promise(async (resolve1) => {
  //         const response = await PokemonData(i);
  //         resolve1(response);
  //       });
  //
  //       tempPromise.then((tempPromiseResult) => {
  //         globalResult.push(tempPromiseResult);
  //         Checklenght(globalResult, resolveMain);
  //       });
  //
  //       promises.push(tempPromise);
  //     }
  //
  //     await Promise.all(promises);
  //   });
  //
  //   await mainPromise.then();
  //
  //   return globalResult;
  // }

  @Patch(':id')
  async updateOne(@Param('id') id: number, @Body() Pokemon): Promise<any> {
    return this.pokemonService.updateOne(id, Pokemon);
  }
  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<any> {
    return this.pokemonService.deleteOne(id);
  }
}
// @Get(':id')
// async findOne(@Param('id') id: number): Promise<any> {
//   // const end = this.reqHistogram.startTimer();
//   // this.reqCounter.inc(1);
//   return new Promise(async (resolve) => {
//     const end = this.reqHistogram.startTimer();
//     setTimeout(async () => {
//       this.reqCounter.inc(1);
//       const result = await this.apiService.findOne(id);
//       end();
//       resolve(result);
//     }, 3000);
//     // const result = this.apiService.findOne(id);
//     //
//     // end();
//     //
//     // return result;
//   });
// }

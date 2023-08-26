// import { PokemonService } from './pokemon.service';
// import { readdirSync, readFileSync } from 'node:fs';
// import * as fs from 'fs';
// import { Test, TestingModule } from '@nestjs/testing';
// import { PokemonController } from './pokemon.controller';
// console.log(fs);
// describe('PokemonService', () => {
//   let pokemonService: PokemonService;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [PokemonController],
//       providers: [PokemonService],
//     }).compile();
//
//     pokemonService = module.get<PokemonService>(PokemonService);
//   });
//   describe('findAll', () => {
//     it('should return an array of pokemons', () => {
//       const pokemonnames = ['Georgin.json', 'kkk.json', 'ttt.json'];
//       const pokemon1 = {
//         name: 'Georgin',
//         attack: 770,
//         defense: 90,
//         health: 13,
//       };
//
//       const readdirSyncresult = jest
//         .spyOn(fs, 'readdirSync')
//         // @ts-ignore
//         .mockReturnValue(pokemonnames);
//       const readFileSyncresult = jest
//         .spyOn(fs, 'readFileSync')
//         .mockReturnValue(JSON.stringify(pokemon1));
//       expect(pokemonService.findAll()).toStrictEqual([
//         pokemon1,
//         pokemon1,
//         pokemon1,
//       ]);
//       expect(readFileSyncresult).toBeCalledTimes(3);
//     });
//   });
// });

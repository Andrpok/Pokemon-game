// import { Test, TestingModule } from '@nestjs/testing';
// import { PokemonController } from './pokemon.controller';
// import { PokemonService } from './pokemon.service';
// import { CreatePokemonDto } from './pokemon.dto';
//
// describe('PokemonController', () => {
//   let pokemonController: PokemonController;
//   let pokemonService: PokemonService;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [PokemonController],
//       providers: [PokemonService],
//     }).compile();
//
//     pokemonService = module.get<PokemonService>(PokemonService);
//     pokemonController = module.get<PokemonController>(PokemonController);
//   });
//
//   describe('findAll', () => {
//     it('should return an array of pokemons', () => {
//       const result = [
//         { name: 'testpokemon', health: 31, defense: 312, attack: 31 },
//         { name: 'testpokemon2', health: 31, defense: 312, attack: 31 },
//       ];
//       jest.spyOn(pokemonService, 'findAll').mockReturnValue(result);
//       expect(pokemonController.findAll()).toBe(result);
//     });
//   });
//   describe('findOne', () => {
//     it('should return one pokemon by name', () => {
//       const name = 'name';
//       const result: CreatePokemonDto = {
//         name: 'Ralff',
//         attack: 30,
//         defense: 50,
//         health: 1,
//       };
//       const findonespy = jest
//         .spyOn(pokemonService, 'findOne')
//         .mockReturnValue(result);
//       expect(pokemonController.findOne(name)).toBe(result);
//       expect(findonespy).toBeCalledWith(name);
//     });
//   });
//   // describe('create', () => {
//   //   it('should add one pokemon', async () => {
//   //     const createPokemonDto: CreatePokemonDto = {
//   //       name: 'Georgin',
//   //       attack: 770,
//   //       defense: 90,
//   //       health: 13,
//   //     };
//   //     const createSpy = jest
//   //       .spyOn(pokemonService, 'create')
//   //       .mockReturnValue();
//   //     const result = await pokemonController.create(createPokemonDto);
//   //     expect(result).toBe(
//   //       `Add a new pokemon ${JSON.stringify(createPokemonDto)}`,
//   //     );
//   //     expect(createSpy).toBeCalledWith(createPokemonDto);
//   //   });
//   // });
//   // describe('deleteOne', () => {
//   //   it('should delete a pokemon', () => {
//   //     const name = 'Georgin';
//   //     const deleteSpy = jest
//   //       .spyOn(pokemonService, 'deleteOne')
//   //       .mockReturnValue('hh');
//   //     expect(pokemonController.deleteOne(name)).toBe(
//   //       `Pokemon "${name}" successfully removed`,
//   //     );
//   //     expect(deleteSpy).toBeCalledWith(name);
//   //   });
//   // });
// });

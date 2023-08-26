import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from '../entities/pokemon.entity';
import { Repository } from 'typeorm';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let pokemonRepository: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'Andy',
          password: '123456',
          database: 'Pokemon_database', // Тестовая база данных
          entities: [Pokemon], // Используем фейковую сущность
          // synchronize: true,
        }),
        TypeOrmModule.forFeature([Pokemon]),
      ],
      providers: [PokemonService],
    }).compile();
    pokemonService = module.get<PokemonService>(PokemonService);
    pokemonRepository = module.get<Repository<Pokemon>>(
      getRepositoryToken(Pokemon),
    ); // module.get<Repository<Pokemon>>;

    await pokemonRepository.clear();
  });
  afterAll(async () => {
    await pokemonRepository.clear();
  });
  describe('integration tests for pokemons', () => {
    it('should return an array of pokemons', async () => {
      const mockpokemons: Pokemon[] = [
        { id: 1, name: 'Pikachu', attack: 33, health: 44, defense: 44 },
      ];

      await pokemonRepository.save(mockpokemons);

      const pokemons = await pokemonService.findAll();
      expect(pokemons).toEqual(mockpokemons);
    });
    it('should update a pokemon', async () => {
      const mockPokemonOrigin = {
        id: 1,
        name: 'Dukachi',
        attack: 99,
        health: 99,
        defense: 99,
      };
      const updating = { attack: 1 };
      await pokemonRepository.save(mockPokemonOrigin);
      await pokemonService.updateOne(1, updating);
      const updatedPokemon = mockPokemonOrigin;
      updatedPokemon.attack = updating.attack;

      const pokemons = await pokemonRepository.find();
      expect(pokemons).toEqual([updatedPokemon]);
    });
    it('should delete a pokemon', async () => {
      const mockPokemon = {
        id: 1,
        name: 'Ferinino',
        attack: 9,
        health: 88,
        defense: 66,
      };
      await pokemonRepository.save(mockPokemon);
      await pokemonService.deleteOne(1);
      const pokemons = await pokemonRepository.find();
      expect(pokemons).toEqual([]);
    });
  });
});

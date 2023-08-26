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
  describe('integration test for cache', () => {
    // it('return "Invalid Id" if id is not a number', async () => {
    //   const result = await pokemonService.findOne('ojjk');
    //   expect(result).toEqual('Invalid Id. Id must be an integer');
    // });
    it('return No such pokemon if pokemon not found in database', async () => {
      const result = await pokemonService.findOne(3);
      expect(result).toEqual('No such pokemon');
    });
    xit('return object from cache if it exists', async () => {
      const id = 1;
      const cachedObject = {
        id: 1,
        name: 'Pikachu',
        attack: 33,
        health: 44,
        defense: 44,
      };
      //
      const result = await pokemonService.findOne(id);
      expect(result).toEqual(cachedObject);
    });
    xit('should return pokemon from repository and cache it', async () => {
      const id = 1;
      const repositoryResult = {
        id: 1,
        name: 'Pikachu',
        attack: 33,
        health: 44,
        defense: 44,
      };
      const mockpokemon: Pokemon = {
        id: 1,
        name: 'Pikachu',
        attack: 33,
        health: 44,
        defense: 44,
      };
      await pokemonRepository.save(mockpokemon);
      const result = await pokemonService.findOne(id);
      expect(result).toEqual(repositoryResult);
    });
  });
});

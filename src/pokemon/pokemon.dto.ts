import { IsPositive, IsAlpha, Length, IsNotEmpty } from 'class-validator';
export class CreatePokemonDto {
  @Length(5, 20)
  @IsAlpha()
  @IsNotEmpty()
  name: string;
  @IsPositive()
  @IsNotEmpty()
  attack: number;
  @IsPositive()
  @IsNotEmpty()
  defense: number;
  @IsPositive()
  @IsNotEmpty()
  health: number;
}
export class UpdatePokemonDto {
  @Length(5, 20)
  @IsAlpha()
  @IsNotEmpty()
  name: string;
  @IsPositive()
  attack?: number;
  @IsPositive()
  defense?: number;
  @IsPositive()
  health?: number;
}

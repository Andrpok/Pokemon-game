import axios from 'axios';
export async function PokemonData(id: number): Promise<any> {
  const response = await axios.get(`http://localhost:3000/pokemon/${id}`);
  return response.data.data[0];
}

export function Checklenght(globalResult: any[], resolveMain): void {
  if (globalResult.length >= 3) {
    resolveMain('done');
  }
}

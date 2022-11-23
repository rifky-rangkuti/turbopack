import { client } from "./main";
import { gql } from "graphql-request";

export const getPokemons = () => {
  return client.request(
    gql`
      query GetPokemons {
        gen3_species: pokemon_v2_pokemonspecies(where: { id: {} }) {
          name
          id
        }
      }
    `
  );
};
export const getPokemon = (variables: { name: string }) => {
  return client.request(
    gql`
      query GetPokemon($name: String!) {
        species: pokemon_v2_pokemonspecies(where: { name: { _eq: $name } }) {
          id
          name
        }
        abilities: pokemon_v2_ability(limit: 1) {
          name
        }
        sprites: pokemon_v2_pokemonformsprites(limit: 1) {
          sprites
        }
        moves: pokemon_v2_move(limit: 20) {
          name
        }
      }
    `,
    variables
  );
};
// query samplePokeAPIquery {

// }

import { useRouter } from "next/router";
import React from "react";
import { getPokemon, getPokemons } from "../../services/pokemon";

function PokemonDetail({ pokemon }) {
  const router = useRouter();
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <div
        className="absolute left-4 top-4 z-10 cursor-pointer text-white"
        onClick={() => router.back()}
      >
        Back
      </div>
      <div className="h-80 w-80 overflow-auto rounded bg-white p-4">
        <p className="text-xl font-bold uppercase tracking-widest text-sky-500">
          {pokemon.name}
        </p>
        <p className="text-base font-semibold text-slate-500">
          Species: <span className="text-sky-500">{pokemon.species.name}</span>
        </p>
        <p className="text-base font-semibold text-slate-500">
          Height: {pokemon.height}
        </p>

        <div className="group">
          <p className="text-base font-semibold text-slate-500">Abilities</p>
          <div className="">
            {pokemon.abilities.map((x) => (
              <p className="ml-4" key={x.ability.name}>
                {`>`} {x.ability.name}
              </p>
            ))}
          </div>
        </div>
        <div className="group">
          <p className="text-base font-semibold text-slate-500">Moves</p>
          <div className="">
            {pokemon.moves.map((x) => (
              <p className="ml-4" key={x.move.name}>
                {`>`} {x.move.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {pokemon.sprites.back_default && (
          <div className="m-4 grid h-36 w-36 cursor-pointer place-items-center rounded bg-slate-300 hover:bg-white">
            <img src={pokemon.sprites.back_default} alt="" />
          </div>
        )}
        {pokemon.sprites.back_shiny && (
          <div className="mr-4 grid h-36 w-36 cursor-pointer place-items-center rounded bg-slate-300 hover:bg-white">
            <img src={pokemon.sprites.back_shiny} alt="" />
          </div>
        )}
        {pokemon.sprites.front_default && (
          <div className="mr-4 grid h-36 w-36 cursor-pointer place-items-center rounded bg-slate-300 hover:bg-white">
            <img src={pokemon.sprites.front_default} alt="" />
          </div>
        )}
        {pokemon.sprites.front_shiny && (
          <div className="mr-4 grid h-36 w-36 cursor-pointer place-items-center rounded bg-slate-300 hover:bg-white">
            <img src={pokemon.sprites.front_shiny} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

// ISR requirement
// But I am usually using React-Query to handle APIs
export async function getStaticProps(ctx) {
  const pokemon = await getPokemon(ctx.params.name);
  return {
    props: { pokemon },
    revalidate: 60,
  };
}
export async function getStaticPaths() {
  const pokemons = await getPokemons();
  const paths = pokemons.results.map((x) => ({
    params: { name: x.name },
  }));

  return { paths, fallback: "blocking" };
}
export default PokemonDetail;

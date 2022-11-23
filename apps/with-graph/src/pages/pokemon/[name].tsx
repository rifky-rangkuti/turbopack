import { useRouter } from "next/router";
import React from "react";
import { getPokemon, getPokemons } from "../../services/pokemon";

function PokemonDetail({ pokemon }) {
  const router = useRouter();
  const sprites = JSON.parse(pokemon.sprites[0].sprites);
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <div
        className="absolute left-4 top-4 z-10 cursor-pointer text-white"
        onClick={() => router.back()}
      >
        Back
      </div>
      <p className="mb-4 text-lg text-red-500">The GraphQL is in BETA state</p>
      <div className="h-80 w-80 overflow-auto rounded bg-white p-4">
        <p className="text-xl font-bold uppercase tracking-widest text-sky-500">
          {pokemon.species[0].name}
        </p>
        <p className="text-base font-semibold text-slate-500">
          Species:{" "}
          <span className="text-sky-500">{pokemon.species[0].name}</span>
        </p>
        <div className="group">
          <p className="text-base font-semibold text-slate-500">Abilities</p>
          <div className="">
            {pokemon.abilities.map((x) => (
              <p className="ml-4" key={x.name}>
                {`>`} {x.name}
              </p>
            ))}
          </div>
        </div>
        <div className="group">
          <p className="text-base font-semibold text-slate-500">Moves</p>
          <div className="">
            {pokemon.moves.map((x) => (
              <p className="ml-4" key={x.name}>
                {`>`} {x.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {sprites.back_default && (
          <div className="m-4 grid h-36 w-36 cursor-pointer place-items-center rounded bg-slate-300 hover:bg-white">
            <img src={sprites.back_default} alt="" />
          </div>
        )}
        {sprites.back_shiny && (
          <div className="mr-4 grid h-36 w-36 cursor-pointer place-items-center rounded bg-slate-300 hover:bg-white">
            <img src={sprites.back_shiny} alt="" />
          </div>
        )}
        {sprites.front_default && (
          <div className="mr-4 grid h-36 w-36 cursor-pointer place-items-center rounded bg-slate-300 hover:bg-white">
            <img src={sprites.front_default} alt="" />
          </div>
        )}
        {sprites.front_shiny && (
          <div className="mr-4 grid h-36 w-36 cursor-pointer place-items-center rounded bg-slate-300 hover:bg-white">
            <img src={sprites.front_shiny} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

// ISR requirement
// But I am usually using React-Query to handle APIs
export async function getStaticProps(ctx) {
  const pokemon = await getPokemon({ name: ctx.params.name });
  return {
    props: { pokemon },
    revalidate: 60,
  };
}
export async function getStaticPaths() {
  const pokemons = await getPokemons();
  const paths = pokemons.gen3_species.map((x) => ({
    params: { name: x.name },
  }));

  return { paths, fallback: "blocking" };
}
export default PokemonDetail;

import { GraphQLClient } from "graphql-request";

const endpoint =
  process.env.NEXT_PUBLIC_GRAPH_URL ?? "https://beta.pokeapi.co/graphql/v1beta";

export const client = new GraphQLClient(endpoint, {
  //   headers: {
  //     authorization: Cookies.get("identity") as any,
  //   },
  fetch: fetch,
});

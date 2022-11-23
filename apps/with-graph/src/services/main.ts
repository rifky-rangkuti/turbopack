import { GraphQLClient } from "graphql-request";

const endpoint = "https://beta.pokeapi.co/graphql/v1beta";

export const client = new GraphQLClient(endpoint, {
  //   headers: {
  //     authorization: Cookies.get("identity") as any,
  //   },
  fetch: fetch,
});

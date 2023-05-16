import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPokemon } from '@modules/models/Pokemon'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getAllPokemons: builder.query<any, null>({
      query: () => `pokemon?limit=1281&offset=0`,
    }),
    getPokemon: builder.query<any, string>({
      query: (url) => url,
    }),
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

export const { useGetAllPokemonsQuery, useGetPokemonQuery, useGetPokemonByNameQuery } = pokemonApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { INamedAPIResource, IPokemon } from '@modules/models/Pokemon'

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getAllPokemons: build.query<INamedAPIResource[], { from: number; to: number }>({
      query: ({ from = 0, to = 1281 }) => `pokemon?limit=${to - from}&offset=${from}`,
      transformResponse: (response: { results: INamedAPIResource[] }) => response.results,
    }),
    getPokemon: build.query<IPokemon, string>({
      query: (url) => url,
    }),
    getPokemonByName: build.query<IPokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonById: build.query<IPokemon, number>({
      query: (id) => `pokemon/${id}`,
    }),
    getPokemonsByType: build.query<any[], string[]>({
      async queryFn(types, _queryApi, _extraOptions, fetchWithBQ) {
        const promises = types.map((type) => fetchWithBQ(`type/${type}`))

        const responses = await Promise.all(promises)

        const pokemonsMap: Record<string, { pokemon: INamedAPIResource; entries: number }> = {}

        responses.forEach(({ data, error }) => {
          if (error) return console.error(error)

          const converted = data as { pokemon: { pokemon: INamedAPIResource }[] }

          converted.pokemon.forEach(({ pokemon }) => {
            if (pokemonsMap[pokemon.name]) return pokemonsMap[pokemon.name].entries++
            pokemonsMap[pokemon.name] = { pokemon, entries: 1 }
          })
        })

        return {
          data: Object.values(pokemonsMap)
            .filter((pokemon) => pokemon.entries === types.length)
            .map((pokemon) => pokemon.pokemon),
        }
      },
    }),
  }),
})

export const {
  useGetAllPokemonsQuery,
  useGetPokemonQuery,
  useGetPokemonByNameQuery,
  useGetPokemonByIdQuery,
  useGetPokemonsByTypeQuery,
} = pokemonsApi

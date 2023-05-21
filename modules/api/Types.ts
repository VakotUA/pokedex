import { INamedAPIResource } from '@modules/models/Pokemon'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const typesApi = createApi({
  reducerPath: 'typesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getAllTypes: build.query<{ results: INamedAPIResource[] }, void>({
      query: () => `type`,
    }),
  }),
})

export const { useGetAllTypesQuery } = typesApi

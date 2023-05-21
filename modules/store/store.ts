import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { pokemonsApi } from '@modules/api/Pokemons'
import { typesApi } from '@modules/api/Types'
import search from '@modules/store/reducers/search'
import types from '@modules/store/reducers/types'

export const store = configureStore({
  reducer: {
    [pokemonsApi.reducerPath]: pokemonsApi.reducer,
    [typesApi.reducerPath]: typesApi.reducer,
    search,
    types,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonsApi.middleware, typesApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

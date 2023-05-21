import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
  value: string[]
}

const initialState = { value: [] } as SearchState

export const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    setTypes(state, action: PayloadAction<string[]>) {
      state.value = action.payload
    },
    addType(state, action: PayloadAction<string>) {
      state.value.push(action.payload)
    },
    addTypes(state, action: PayloadAction<string[]>) {
      state.value.push(...action.payload)
    },
  },
})

export const typesActions = typesSlice.actions
export const { setTypes, addType, addTypes } = typesSlice.actions

export default typesSlice.reducer

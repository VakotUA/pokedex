import { NextPage } from 'next'

import Filters from '@components/Filters'
import PokemonsList from '@components/PokemonsList'

export default (() => {
  return (
    <>
      <Filters />
      <PokemonsList />
    </>
  )
}) as NextPage

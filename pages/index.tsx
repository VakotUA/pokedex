import { NextPage } from 'next'

import { useGetAllPokemonsQuery } from '@modules/api/Pokemons'
import { useEffect, useState } from 'react'
import PokemonsList from '@components/PokemonsList'

export default (() => {
  const { data, error, isLoading } = useGetAllPokemonsQuery(null)

  const [pokemons, setPokemons] = useState<[{ name: string; url: string }]>()

  useEffect(() => {
    if (!data) return

    setPokemons(data.results)
  }, [data])

  return (
    <>
      <section>
        {error ? <div>Error appears while pokemons loading</div> : null}

        {isLoading ? <div>Loading...</div> : null}

        {pokemons ? <PokemonsList pokemons={pokemons} /> : null}
      </section>
    </>
  )
}) as NextPage

import PokemonCard from '@components/PokemonCard'
import style from './style.module.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Divider, List } from 'antd'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@modules/store/hooks'
import { useGetAllPokemonsQuery, useGetPokemonsByTypeQuery } from '@modules/api/Pokemons'
import { INamedAPIResource } from '@modules/models/Pokemon'

export default (() => {
  const { data: pokemons, error, isLoading } = useGetAllPokemonsQuery({ from: 0, to: 1281 })

  if (error) {
    console.error(error)
  }

  const [filtered, setFiltered] = useState<INamedAPIResource[]>([])
  const [data, setData] = useState<INamedAPIResource[]>(filtered.slice(0, 12))

  const search = useAppSelector((state) => state.search.value)
  const types = useAppSelector((state) => state.types.value)

  const { data: typedPokemons } = useGetPokemonsByTypeQuery(types)

  useEffect(() => {
    if (!pokemons || !typedPokemons) return

    setFiltered(
      (types.length ? typedPokemons : pokemons).filter((pokemon) =>
        pokemon.name.includes(search.toLowerCase())
      )
    )
  }, [search, pokemons, typedPokemons, types.length])

  useEffect(() => {
    setData(filtered.slice(0, Math.min(12, filtered.length)))
  }, [filtered])

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={() => setData(filtered.slice(0, data.length + 12))}
      hasMore={data.length < filtered.length}
      loader={null}
      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      scrollableTarget="scrollableDiv"
    >
      <List
        className={style.List}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 6,
          xxl: 6,
        }}
        loading={isLoading}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <PokemonCard pokemon={item} />
          </List.Item>
        )}
      />
    </InfiniteScroll>
  )
}) as React.FC

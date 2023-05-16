import PokemonCard from '@components/PokemonCard'
import style from './style.module.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Divider, Input, List } from 'antd'
import { useEffect, useState } from 'react'
import useDebounce from '@modules/hooks/useDebounce'

export default (({ pokemons }) => {
  const [filtered, setFiltered] = useState<{ name: string; url: string }[]>(pokemons)
  const [data, setData] = useState<{ name: string; url: string }[]>(filtered.slice(0, 12))

  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce<string>(search, 300)

  useEffect(() => {
    if (!debouncedSearch) return

    setFiltered(pokemons.filter((poke) => poke.name.includes(search.toLowerCase())))
  }, [debouncedSearch])

  useEffect(() => {
    setData(filtered.slice(0, Math.min(12, filtered.length)))
  }, [filtered])

  return (
    <>
      <div className={style.Search}>
        <Input
          placeholder="Pokemon name"
          size="large"
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </div>

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
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 6,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <PokemonCard pokemon={item} />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </>
  )
}) as React.FC<{ pokemons: [{ name: string; url: string }] }>

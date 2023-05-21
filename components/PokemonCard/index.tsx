import { useEffect, useState } from 'react'
import { Card, Image } from 'antd'

import style from './style.module.scss'

import { useGetPokemonQuery } from '@modules/api/Pokemons'

import { GiLibertyWing, GiPiercingSword, GiPointySword, GiEdgedShield } from 'react-icons/gi'
import { BsShieldShaded } from 'react-icons/bs'
import { FaHeartbeat } from 'react-icons/fa'
import { INamedAPIResource, IStat, IType } from '@modules/models/Pokemon'

export default (({ pokemon }) => {
  const { data, error, isLoading } = useGetPokemonQuery(pokemon.url)

  const [visible, setVisible] = useState<boolean>(false)
  const [images, setImages] = useState<string[]>([])

  const [coverImage, setCoverImage] = useState<string | undefined>()

  const [colors, setColors] = useState<{ text: string; bg: string }>()

  if (error) {
    console.error(error)
  }

  useEffect(() => {
    if (!data) return

    setColors({
      text: `var(--color-${data.types[0].type.name})`,
      bg: `var(--bg-${data.types[0].type.name})`,
    })

    setCoverImage(
      data.sprites.other.dream_world.front_default ||
        data.sprites.front_default ||
        data.sprites.front_shiny ||
        undefined
    )
  }, [data])

  return (
    <Card
      style={{ overflow: 'hidden' }}
      loading={isLoading}
      hoverable
      cover={
        <Image
          alt="cover"
          className={style.Image}
          preview={{ visible: false }}
          onClick={() => {
            setVisible(true)
            setImages(
              [
                data?.sprites.front_default,
                data?.sprites.front_female,
                data?.sprites.back_default,
                data?.sprites.back_female,
                data?.sprites.front_shiny,
                data?.sprites.back_shiny,
                data?.sprites.back_shiny_female,
                data?.sprites.front_shiny_female,
                data?.sprites.other.dream_world.front_default,
                data?.sprites.other.dream_world.front_female,
                data?.sprites.other.home.front_default,
                data?.sprites.other.home.front_female,
                data?.sprites.other['official-artwork'].front_default,
              ].filter((img) => img) as string[]
            )
          }}
          height={200}
          src={coverImage}
          style={{ background: colors?.bg, padding: 16 }}
        />
      }
    >
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
          }}
        >
          {images.map((image: string, index: number) => (
            <Image key={index} src={image} alt={pokemon.name} />
          ))}
        </Image.PreviewGroup>
      </div>

      <div className={style.name}>
        <h1>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)}
          <br />
          <span style={{ color: colors?.text }}>{data?.base_experience}xp</span>
        </h1>
      </div>

      <div className={style.types}>
        <ul>
          {data?.types.map((type: IType, index: number) => (
            <li style={{ background: `var(--bg-${type.type.name})` }} key={index}>
              {type.type.name}
            </li>
          ))}
        </ul>
      </div>

      {data?.stats.map((stat: IStat, index: number) => (
        <Card.Grid className={style.stat} style={{ background: colors?.bg }} key={index}>
          <p>{stat.base_stat}</p>
          <p>
            {stat.stat.name === 'hp' ? <FaHeartbeat /> : ''}
            {stat.stat.name === 'attack' ? <GiPiercingSword /> : ''}
            {stat.stat.name === 'defense' ? <BsShieldShaded /> : ''}
            {stat.stat.name === 'special-attack' ? <GiPointySword /> : ''}
            {stat.stat.name === 'special-defense' ? <GiEdgedShield /> : ''}
            {stat.stat.name === 'speed' ? <GiLibertyWing /> : ''}
          </p>
        </Card.Grid>
      ))}
    </Card>
  )
}) as React.FC<{ pokemon: INamedAPIResource }>

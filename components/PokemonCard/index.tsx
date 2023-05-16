import { useEffect, useState } from 'react'
import { Card, Image } from 'antd'

import style from './style.module.scss'

import { useGetPokemonQuery } from '@modules/api/Pokemons'

import { GiLibertyWing, GiPiercingSword, GiPointySword, GiEdgedShield } from 'react-icons/gi'
import { BsShieldShaded } from 'react-icons/bs'
import { FaHeartbeat } from 'react-icons/fa'

export default (({ pokemon }) => {
  const { data, error, isLoading } = useGetPokemonQuery(pokemon.url)

  const [visible, setVisible] = useState(false)

  if (error) {
    return console.error(error)
  }

  const [info, setInfo] = useState<any | null>({
    name: 'Unknown',
    types: [],
    image: null,
    images: [],
    stats: [],
    baseExperience: 0,
    bgColor: 'white',
    textColor: 'white',
  })

  useEffect(() => {
    if (!data) return

    const images = [
      ...Object.values(data.sprites.other.dream_world).filter((img) => img),
      ...Object.values(data.sprites.other.home).filter((img) => img),
      ...Object.values(data.sprites.other['official-artwork']).filter((img) => img),
    ]

    setInfo({
      name: data.name,
      types: data.types,
      image:
        data.sprites.other.dream_world.front_default ||
        data.sprites.front_default ||
        (images.length && images[0]),
      images: images,
      stats: data.stats,
      baseExperience: data.base_experience,
      bgColor: data.types.length > 0 ? `var(--bg-${data.types[0].type.name}, white)` : '',
      textColor: data.types.length > 0 ? `var(--color-${data.types[0].type.name}, white)` : '',
    })
  }, [data])

  return (
    <Card
      style={{ overflow: 'hidden' }}
      loading={isLoading}
      hoverable
      cover={
        <>
          <Image
            preview={{ visible: false }}
            onClick={() => setVisible(true)}
            height={200}
            src={info.image}
            style={{ background: info.bgColor, padding: '30px' }}
          />
          <div style={{ display: 'none' }}>
            <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
              {info?.images.length &&
                info.images.map((image: string, index: number) => (
                  <Image key={index} src={image} />
                ))}
            </Image.PreviewGroup>
          </div>
        </>
      }
    >
      {info && (
        <div className={style.name}>
          <h6 style={{ color: info.textColor }}>{`Experience ${info.baseExperience}`}</h6>
          <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)}</h1>
        </div>
      )}

      {info && (
        <div className={style.types}>
          <ul>
            {info.types.map((type: any, index: number) => (
              <li style={{ background: `var(--bg-${type.type.name}, white)` }} key={index}>
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {info &&
        info.stats.map((stat: any, index: number) => (
          <Card.Grid className={style.stat} style={{ background: info.bgColor }} key={index}>
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
}) as React.FC<{ pokemon: { name: string; url: string } }>

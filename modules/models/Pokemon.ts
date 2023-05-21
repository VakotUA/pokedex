export interface INamedAPIResource {
  name: string
  url: string
}
export interface IAbility {
  is_hidden: boolean
  slot: number
  ability: INamedAPIResource
}

export interface IGameIndex {
  game_index: number
  version: INamedAPIResource
}

export interface IHeldItem {
  item: INamedAPIResource
  version_details: [
    {
      rarity: number
      version: INamedAPIResource
    }
  ]
}

export interface IMove {
  move: INamedAPIResource
  version_group_details: [
    {
      level_learned_at: number
      version_group: INamedAPIResource
      move_learn_method: INamedAPIResource
    }
  ]
}

export interface ISprites {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
  other: {
    dream_world: {
      front_default: string | null
      front_female: string | null
    }
    home: {
      front_default: string | null
      front_female: string | null
      front_shiny: string | null
      front_shiny_female: string | null
    }
    'official-artwork': {
      front_default: string | null
    }
  }
}

export interface IStat {
  base_stat: number
  effort: number
  stat: INamedAPIResource
}

export interface IType {
  slot: number
  type: INamedAPIResource
}

export interface IPastType {
  generation: INamedAPIResource
  types: IType[]
}

export interface IPokemon {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: IAbility[]
  forms: INamedAPIResource[]
  game_indices: IGameIndex[]
  held_items: IHeldItem[]
  location_area_encounters: string
  moves: IMove[]
  species: INamedAPIResource[]
  sprites: ISprites
  stats: IStat[]
  types: IType[]
  past_types: IPastType[]
}

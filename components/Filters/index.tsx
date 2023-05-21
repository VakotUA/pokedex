import { searchActions } from '@modules/store/reducers/search'
import { typesActions } from '@modules/store/reducers/types'
import { Input, Select } from 'antd'
import style from './style.module.scss'
import { useGetAllTypesQuery } from '@modules/api/Types'
import useDebounce from '@modules/hooks/useDebounce'
import { useAppDispatch, useAppSelector } from '@modules/store/hooks'
import { useState, useEffect } from 'react'
import HideOnScroll from '../HideOnScroll'

export default (() => {
  const dispatch = useAppDispatch()

  const { data, isLoading, error } = useGetAllTypesQuery()

  if (error) {
    console.error(error)
  }

  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce<string>(search, 300)

  const types = useAppSelector((state) => state.types.value)

  useEffect(() => {
    dispatch(searchActions.setSearch(debouncedSearch))
  }, [debouncedSearch, dispatch])

  return (
    <HideOnScroll className={style.Filters}>
      <Input
        className={style.Search}
        placeholder="Pokemon name"
        size="large"
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />

      <Select
        loading={isLoading}
        className={style.Select}
        showSearch
        size="large"
        mode="multiple"
        placeholder="Pokemon type(-s)"
        value={types}
        onChange={(value) => {
          dispatch(typesActions.setTypes(value))
        }}
      >
        {data?.results.map((type, index) => (
          <Select.Option
            key={index}
            value={type.name}
            disabled={!types.includes(type.name) && types.length >= 2}
            style={{ marginTop: index ? 4 : 0 }}
          >
            <span>{type.name}</span>
          </Select.Option>
        ))}
      </Select>
    </HideOnScroll>
  )
}) as React.FC

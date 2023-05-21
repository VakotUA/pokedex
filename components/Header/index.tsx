import style from './style.module.scss'
import useDebounce from '@modules/hooks/useDebounce'
import { Input, Layout, Select, Space } from 'antd'
import { useState, useEffect } from 'react'
import { searchActions } from '@modules/store/reducers/search'
import { useAppDispatch, useAppSelector } from '@modules/store/hooks'
import { useGetAllTypesQuery } from '@modules/api/Types'
import { typesActions } from '@modules/store/reducers/types'

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
    <Layout.Header className={style.Header}>
      <h1 className={style.Title}>Pokedex</h1>

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
    </Layout.Header>
  )
}) as React.FC

import { Layout } from 'antd'
import style from './style.module.scss'

export default (() => {
  return (
    <Layout.Header className={style.Header}>
      <h1 className={style.Title}>Pokedex</h1>
    </Layout.Header>
  )
}) as React.FC

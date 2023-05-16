import '@styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@modules/store/store'
import { Layout } from 'antd'

const { Header, Footer, Content } = Layout

// const headerStyle: React.CSSProperties = {
//   textAlign: 'center',
//   color: '#fff',
//   height: 64,
//   paddingInline: 50,
//   lineHeight: '64px',
// }

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
}

// const footerStyle: React.CSSProperties = {
//   textAlign: 'center',
// }

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        {/* <Header style={headerStyle}>Header</Header> */}
        <Content style={contentStyle}>
          <Component {...pageProps} />
        </Content>
        {/* <Footer style={footerStyle}>Footer</Footer> */}
      </Layout>
    </Provider>
  )
}

import Header from '@components/Header'
import Footer from '@components/Footer'
import { Layout } from 'antd'

export default (({ children }) => {
  return (
    <Layout>
      <Header />
      <Layout.Content>{children}</Layout.Content>
      <Footer />
    </Layout>
  )
}) as React.FC<{ children: React.ReactNode }>

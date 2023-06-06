import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
import RouteGuard from '@/components/RouteGuard'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider session={pageProps.session}>
      <RouteGuard>
        <NavBar />
        <Component {...pageProps} />
      </RouteGuard>
    </SessionProvider>
  )
}

import Head from 'next/head'
import type { AppProps } from 'next/app'
import '../index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CodeQuest - Vault Edition | IEEE UCSC CTF Hackathon</title>
        <meta name="description" content="The ultimate cybersecurity challenge awaits. Join IEEE UCSC's premier CTF hackathon." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

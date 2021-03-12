import NextHead from 'next/head'
import * as React from 'react'

const Home = () => (
  <>
    <NextHead>
      <meta charSet="UTF-8" />
      <title>Twind Next.js Example</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>

    <main className="h-screen bg-purple-400 flex items-center justify-center">
      <h1 className="font-bold text(center 5xl white sm:gray-800 md:pink-700)">This is Twind!</h1>
    </main>
  </>
)

export default Home

import Head from 'next/head'
import React, { useState } from "react";
import styles from './index.module.css'

export default function Home() {
  const [animal, setAnimal] = useState<string>("")
  const [names, setNames] = useState<string[]>([])
  const [error, setError] = useState<string>("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()

    try{
      const response = await fetch("../api/_generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal }),
      })

      const data = await response.json()
      if(response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`)
      }

      setNames(data.result)
      setAnimal("")
      setError("")
    } catch(error: any) {
        setNames([])
        setError(`Error: ${error}`)
      }
  }

  return (
    <div className={ styles.body }>
      <Head>
        <title>Pet name generator - chatGPT</title>
        <meta name="description" content="Pet name generator - chatGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={ styles.main }>
        <img src="/pets.png" alt="favicon" className={ styles.icon }/>
        <h3>Name my Pet</h3>
        <form onSubmit={ onSubmit }>
          <input
            type="text"
            name="animal"
            value={ animal }
            placeholder="Enter an animal"
            onChange={(e) => {
              setAnimal(e.target.value)
            }}
          />
          <input
            type="submit"
            value="Generate names"
           />
        </form>
        <div className={ styles.result }>
          <p className={ error ? styles.error : styles.span }>{ error || names }</p>
        </div>
      </main>
    </div>
  )
}

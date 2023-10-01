import React, { useState } from 'react';
import Head from 'next/head';
import MusicRecommender from '../components/MusicRecommender';
import styles from '../styles/Home.module.css';

export default function Home() {
  // Create a state variable for storing the user input
  const [input, setInput] = useState('');

  // Define a function that handles the input change event
  function handleChange(event) {
    // Set the state with the input value
    setInput(event.target.value);
  }

  // Define a function that handles the button click event
  function handleClick() {
    // Do nothing if the input is empty
    if (!input) return;

    // TODO: Add some logic to play the input song using the Spotify Web Playback SDK
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Bopify</title>
        <meta name="description" content="A streaming music recommender system built with Vercel AI SDK and Next Js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Bopify!
        </h1>

        <p className={styles.description}>
          Give us a song and we will curate a personalized playlist filled with certified bops.
        </p>

        <div className={styles.input}>
          <input type="text" placeholder="Enter something..." value={input} onChange={handleChange} />
          <button onClick={handleClick}>Get Recommendations</button>
        </div>

        {/* Use the music recommender component and pass the input as a prop */}
        <MusicRecommender input={input} />
      </main>

    </div>
  )
}
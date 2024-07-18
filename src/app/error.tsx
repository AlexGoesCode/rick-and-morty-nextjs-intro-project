'use client'
import React from 'react'

const Error = ({ error, reset }: { error: Error, reset: () => void }) => {
  console.log(error)
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "5em", textAlign: "center" }}>
      <div>
        <h2>My Custom Error Page</h2>
        <p>{ error.message }</p>
        <button onClick={() => reset()}>Try again?</button>
      </div>
    </div>
  )
}

export default Error
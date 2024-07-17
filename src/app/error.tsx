'use client';

import React from 'react';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.log(error);
  return (
    <div>
      <h2>My custom Error</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again?</button>
    </div>
  );
};

export default Error;

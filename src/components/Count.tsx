import React, { useState } from 'react';

const Count = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count goes up!</button>
      <h2>{count}</h2>
    </div>
  );
};

export default Count;

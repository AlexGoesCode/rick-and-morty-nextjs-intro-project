import Link from 'next/link';
import React from 'react';

const RnMList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch('https://rickandmortyapi.com/api/character');
  const results = await response.json();

  return (
    <div>
      <h2>Characters</h2>
      <ul>
        {results.results.map((character) => {
          return (
            <li key={character.id}>
              <Link href={`/characters/${character.id}`}>{character.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RnMList;

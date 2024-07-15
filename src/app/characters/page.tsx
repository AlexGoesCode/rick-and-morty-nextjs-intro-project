import RnMList from '@/components/RnMList';
import { Suspense } from 'react';

const characterspage = () => {
  return (
    <>
      <h1>Here is characters page</h1>
      <Suspense fallback={<p>Characters loading...</p>}>
        <RnMList />
      </Suspense>
    </>
  );
};

export default characterspage;

import React from 'react';
import { BeatLoader, BounceLoader, HashLoader, GridLoader, DotLoader } from 'react-spinners';

const Loading: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <HashLoader color="#fe0603" size={40} />
    </div>
  );
};

export default Loading;

'use client';

import Image from 'next/image';

interface RefreshCountProps {
  remaining: number;
}

const RefreshCount: React.FC<RefreshCountProps> = ({ remaining }) => {
  const getImagePath = () => {
    if (remaining >= 2) {
      return '/data/images/icons/refresh2.png';
    } else if (remaining === 1) {
      return '/data/images/icons/refresh1.png';
    } else {
      return '/data/images/icons/refresh0.png';
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center'}}>
      <Image src={getImagePath()} alt="Remaining refreshes" width={30} height={30} />
    </div>
  );
};

export default RefreshCount;
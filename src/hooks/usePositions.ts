import { useEffect, useState } from 'react';
import { getPositions } from '../helpers/api';
import { Position } from '../types/api';

interface Result {
  positions: Position[];
  loading: boolean;
}

export const usePositions = (): Result => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLodaing] = useState(false);

  const loadPositions = async () => {
    setLodaing(true);

    const positionsFromServer = await getPositions();

    setPositions(positionsFromServer);
    setLodaing(false);
  };

  useEffect(() => {
    loadPositions();
  }, []);

  return {
    positions,
    loading,
  };
};

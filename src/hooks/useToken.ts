import { useState } from 'react';
import { getToken } from '../helpers/api';
import { getMinutesDifference } from '../helpers/getMinutesDifference';
import { Token } from '../types/api';

interface Result {
  token: Token | null;
  softUpdate: VoidFunction;
  forcedUpdate: VoidFunction;
}

export const useToken = (): Result => {
  const [token, setToken] = useState<Token | null>(() => {
    const rawStorageData = localStorage.getItem('token');

    if (!rawStorageData) {
      return null;
    }

    const storageToken = JSON.parse(rawStorageData);

    return {
      ...storageToken,
      timestamp: new Date(storageToken?.timestamp),
    } as Token;
  });

  const tokenForcedUpdate = async () => {
    const newToken = await getToken();

    setToken(newToken);
    localStorage.setItem('token', JSON.stringify(newToken));
  };

  const isValidToken = (tokenToCheck: Token | null): boolean => {
    if (!tokenToCheck) {
      return false;
    }

    return getMinutesDifference(new Date(), tokenToCheck.timestamp) <= 39;
  };

  const softUpdate = async () => {
    if (isValidToken(token)) {
      return;
    }

    await tokenForcedUpdate();
  };

  softUpdate();

  return {
    token,
    forcedUpdate: tokenForcedUpdate,
    softUpdate,
  };
};

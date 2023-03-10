/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { Position, Token, User } from '../types/api';

interface TokenFromServer {
  succes: boolean;
  token: string;
}

interface UserFromServer {
  succes: boolean;
  user: User;
  message?: string;
}

interface UsersFromServer {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url: string | null,
    prev_url: string | null,
  },
  users: User[];
  message?: string;
}

interface PositionsFromServer {
  success: boolean;
  positions: Position[];
  message?: string;
}

interface GetUserResult {
  users: User[];
  isLastPage: boolean;
}

interface SendUserOptions {
  token: string;
  user: {
    name: string;
    email: string;
    phone: string;
    position_id: string;
    photo: File;
  }
}

const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

const fetchAPI = async <T>(endpoint: string, init?: RequestInit) => {
  const response = await fetch(`${API_URL}${endpoint}`, init);

  const data = await response.json();

  const successStatuses = [
    200,
    201,
  ];

  if (!successStatuses.includes(response.status) || !data?.success) {
    throw new Error(
      `Failed to fetch, code ${response.status} status ${response.statusText}: ${data?.message}`,
    );
  }

  return data as T;
};

export const getToken = async (): Promise<Token> => {
  try {
    const data = await fetchAPI<TokenFromServer>('/token');

    return { timestamp: new Date(), ...data };
  } catch {
    throw new Error('Unabalbe to get token');
  }
};

export const getUser = async (id: number): Promise<User> => {
  try {
    const { user } = await fetchAPI<UserFromServer>(`/users/${id}`);

    return user;
  } catch {
    throw new Error('Unabalbe to get user');
  }
};

export const getUsers = async (page: number, count: number): Promise<GetUserResult> => {
  try {
    const { users, links } = await fetchAPI<UsersFromServer>(`/users?page=${page}&count=${count}`);

    return {
      users,
      isLastPage: !links.next_url,
    };
  } catch {
    throw new Error('Unabalbe to get users');
  }
};

export const getPositions = async (): Promise<Position[]> => {
  try {
    const { positions } = await fetchAPI<PositionsFromServer>('/positions');

    return positions;
  } catch {
    throw new Error('Unabalbe to get positions');
  }
};

export const sendUser = async ({
  token,
  user,
}: SendUserOptions) => {
  const form = new FormData();

  let key: keyof typeof user;

  for (key in user) {
    form.append(key, user[key]);
  }

  await fetchAPI('/users', {
    method: 'POST',
    headers: {
      Token: token,
    },
    body: form,
  });
};

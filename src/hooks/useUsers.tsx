import React, {
  createContext, PropsWithChildren, useContext, useEffect, useState,
} from 'react';
import { getUsers } from '../helpers/api';
import { User } from '../types/api';

interface Result {
  users: User[];
  loading: boolean;
  loadMoreUsers: VoidFunction;
  refresh: VoidFunction;
  isLastPage: boolean;
}

const useUsersFunctionality = (): Result => {
  const initialPagination = {
    count: 6,
    page: 1,
    isLastPage: false,
  };
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(initialPagination);

  const loadUsers = async () => {
    if (pagination.isLastPage) {
      return;
    }

    setLoading(true);

    const { users: usersFromServer, isLastPage } = await getUsers(
      pagination.page,
      pagination.count,
    );

    setUsers((prev) => [...prev, ...usersFromServer]);
    setLoading(false);
    setPagination(({ count, page }) => ({
      count,
      page: page + 1,
      isLastPage,
    }));
  };

  const refresh = async () => {
    setPagination(initialPagination);
    setUsers([]);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loadMoreUsers: loadUsers,
    loading,
    isLastPage: pagination.isLastPage,
    refresh,
  };
};

const UsersCtx = createContext<Result>({} as Result);

export const UsersProvider = ({ children }: PropsWithChildren) => (
  <UsersCtx.Provider value={useUsersFunctionality()}>
    {children}
  </UsersCtx.Provider>
);

export const useUsers = () => (useContext(UsersCtx));

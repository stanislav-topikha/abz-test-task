import { useEffect, useState } from 'react';
import { getUsers } from '../helpers/api';
import { User } from '../types/api';

interface Result {
  users: User[];
  loading: boolean;
  loadMoreUsers: VoidFunction;
  refresh: VoidFunction;
  isLastPage: boolean;
}

export const useUsers = (): Result => {
  const initialPaggination = {
    count: 6,
    page: 1,
    isLastPage: false,
  };
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLodaing] = useState(false);
  const [pagination, setPagination] = useState(initialPaggination);

  const loadUsers = async () => {
    if (pagination.isLastPage) {
      return;
    }

    setLodaing(true);

    const { users: usersFromServer, isLastPage } = await getUsers(
      pagination.page,
      pagination.count,
    );

    setUsers((prev) => [...prev, ...usersFromServer]);
    setLodaing(false);
    setPagination(({ count, page }) => ({
      count,
      page: page + 1,
      isLastPage,
    }));
  };

  const refresh = async () => {
    setPagination(initialPaggination);
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

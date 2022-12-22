import { useEffect, useState } from 'react';
import { getUsers } from '../helpers/api';
import { User } from '../types/api';

interface Result {
  users: User[];
  loadMoreUsers: VoidFunction;
  isLastPage: boolean;
}

export const useUsers = (): Result => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    count: 6,
    page: 1,
    isLastPage: false,
  });

  const loadMoreUsers = async () => {
    if (pagination.isLastPage) {
      return;
    }

    const { users: usersFromServer, isLastPage } = await getUsers(
      pagination.page,
      pagination.count,
    );

    setUsers((prev) => [...prev, ...usersFromServer]);
    setPagination(({ count, page }) => ({
      count,
      page: page + 1,
      isLastPage,
    }));
  };

  useEffect(() => {
    loadMoreUsers();
  }, []);

  return {
    users,
    loadMoreUsers,
    isLastPage: pagination.isLastPage,
  };
};

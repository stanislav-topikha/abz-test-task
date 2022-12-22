import { useEffect, useState } from 'react';
import { getUsers } from '../helpers/api';
import { User } from '../types/api';

interface Result {
  users: User[];
  loadMore: VoidFunction;
}

export const useUsers = (): Result => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    count: 6,
    page: 1,
  });

  const loadUsers = async () => {
    const usersFromServer = await getUsers(
      pagination.page,
      pagination.count,
    );

    setUsers((prev) => [...prev, ...usersFromServer]);
    setPagination(({ count, page }) => ({ count, page: page + 1 }));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loadMore: loadUsers,
  };
};

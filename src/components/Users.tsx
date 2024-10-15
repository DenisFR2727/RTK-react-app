import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDeleteUserMutation, useGetUsersQuery } from "../api";
import { setGetUsers } from "../redux/usersSlice";

function Users() {
  const dispatch = useDispatch();
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    dispatch(setGetUsers(users || []));
  }, [dispatch, users]);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка...</div>;

  const deleteUserHandel = async (userId: number) => {
    try {
      await deleteUser(userId).unwrap(); // Запит на видалення
    } catch (err) {
      console.error("Failed to delete the user", err);
    }
  };
  return (
    <div className="users">
      <div className="users-list">
        {users?.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => deleteUserHandel(user.id)}>Delete</button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Users;

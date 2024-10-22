import { useCallback } from "react";
import { useDeleteUserMutation, useGetUsersQuery } from "../../api";
import UsersList from "./UsersList";

function Users() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [setDeleteUser] = useDeleteUserMutation();

  const deleteUserHandel = useCallback(
    async (userId: number) => {
      try {
        await setDeleteUser(userId);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    [setDeleteUser]
  );

  const list_user = (
    <UsersList users={users} deleteUserHandel={deleteUserHandel} />
  );

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка...</div>;

  return (
    <div className="users">
      <div className="users-list">{list_user}</div>
    </div>
  );
}
export default Users;

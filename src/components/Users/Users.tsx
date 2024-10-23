import { useCallback, useEffect, useState } from "react";
import { useDeleteUserMutation, useGetUsersQuery } from "../../api";
import UsersList from "./UsersList";
import Loading from "../Loading/Loading";

function Users() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [setDeleteUser] = useDeleteUserMutation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Штучна затримка на 1.5 секунди перед рендерингом списку
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout); // очищення таймера при демонтажі компонента
  }, [isLoading]);

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

  if (loading || isLoading) return <Loading />;
  if (error) return <div>Ошибка...</div>;

  return (
    <div className="users">
      <div className="users-list">{list_user}</div>
    </div>
  );
}
export default Users;

import { useDeleteUserMutation, useGetUsersQuery } from "../../api";

function Users() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [setDeleteUser] = useDeleteUserMutation();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка...</div>;

  const deleteUserHandel = async (userId: number) => {
    try {
      await setDeleteUser(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
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

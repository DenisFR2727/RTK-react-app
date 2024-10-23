import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IUsers } from "../../redux/type";
import classes from "./UsersList.module.scss";
import { useAppDispatch } from "../../redux/hooks";
import { setShowModalForm } from "../../redux/usersSlice";

interface UserProps {
  users: IUsers[] | undefined;
  deleteUserHandel: (id: number) => void;
}

function UsersList({ users, deleteUserHandel }: UserProps) {
  const dispatch = useAppDispatch();

  const showUserForm = () => {
    dispatch(setShowModalForm(true));
  };
  return (
    <table className="table">
      <thead>
        <tr style={{ background: "red" }}>
          <th scope="col" style={{ background: "red" }}>
            №
          </th>
          <th scope="col">Name</th>
          <th scope="col">User Name</th>
          <th scope="col">Email</th>
          <th scope="col" style={{ background: "red" }}></th>
          <th scope="col" style={{ background: "red" }}>
            Address
          </th>
          <th scope="col" style={{ background: "red" }}></th>
          <th scope="col">
            <button onClick={showUserForm}>Add user</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id} className={classes.background}>
            <th scope="row">{user.id}</th>
            <td className={classes.content}>
              <p>{user.name}</p>
            </td>
            <td className={classes.content}>
              <p>{user.username}</p>
            </td>
            <td className={classes.content}>
              <p>{user.email}</p>
            </td>
            <td>
              <p>City:</p>
              <p>{user.address?.city}</p>
            </td>
            <td>
              <p>Street:</p>
              <p>{user.address?.street}</p>
            </td>
            <td>
              <p>Suite:</p>
              <p>{user.address?.suite}</p>
            </td>
            <td className={classes.content}>
              <button onClick={() => deleteUserHandel(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default UsersList;

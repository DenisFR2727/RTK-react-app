import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IUsers } from "../../redux/type";
import classes from "./UsersList.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setEditUserValues, setShowModalForm } from "../../redux/usersSlice";
import "../../styles/animations.scss";
import DeleteUser from "../UI/DeleteUser";
import Edit from "../UI/Edit";
interface UserProps {
  users: IUsers[] | undefined;
  deleteUserHandel: (id: number) => void;
}

function UsersList({ users, deleteUserHandel }: UserProps) {
  const dispatch = useAppDispatch();
  const isEditInput = useAppSelector((state) => state.user.isShowEditUser);
  const currentIdEditUser = useAppSelector((state) => state.user.currentIdUser);
  const editUserValues = useAppSelector((state) => state.user.editUserValues);

  const showUserForm = () => {
    dispatch(setShowModalForm(true));
  };

  // Edit Input User
  const handleChange = (
    userId: number,
    field: keyof IUsers | "address",
    value: string,
    addressField?: keyof IUsers["address"]
  ) => {
    dispatch(setEditUserValues({ userId, field, value, addressField }));
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
        {users?.map((user) => {
          const edit = isEditInput && currentIdEditUser === user.id;
          return (
            <tr key={user.id} className={classes.background}>
              <th scope="row">{user.id}</th>
              <td className={classes.content}>
                <div className={classes.contentUser}>
                  <p>{user.name}</p>
                  {edit && (
                    <input
                      onChange={(e) =>
                        handleChange(user.id, "name", e.target.value)
                      }
                      value={editUserValues[user.id]?.name ?? user.name ?? ""}
                      type="text"
                      placeholder="name"
                    />
                  )}
                </div>
              </td>
              <td className={classes.content}>
                <div className={classes.contentUser}>
                  <p>{user.username}</p>
                  {edit && (
                    <input
                      onChange={(e) =>
                        handleChange(user.id, "username", e.target.value)
                      }
                      value={
                        editUserValues[user.id]?.username ?? user.username ?? ""
                      }
                      type="text"
                      placeholder="username"
                    />
                  )}
                </div>
              </td>
              <td className={classes.content}>
                <div className={classes.contentUser}>
                  <p>{user.email}</p>
                  {edit && (
                    <input
                      onChange={(e) =>
                        handleChange(user.id, "email", e.target.value)
                      }
                      value={editUserValues[user.id]?.email ?? user.email ?? ""}
                      type="email"
                      placeholder="email"
                    />
                  )}
                </div>
              </td>
              <td className={classes.content}>
                <div className={classes.contentUser}>
                  <p>City:</p>
                  <p>{user.address?.city}</p>
                  {edit && (
                    <input
                      onChange={(e) =>
                        handleChange(user.id, "address", e.target.value, "city")
                      }
                      value={
                        editUserValues[user.id]?.address?.city ??
                        user.address?.city ??
                        ""
                      }
                      type="text"
                      placeholder="city"
                    />
                  )}
                </div>
              </td>
              <td className={classes.content}>
                <div className={classes.contentUser}>
                  <p>Street:</p>
                  <p>{user.address?.street}</p>
                  {edit && (
                    <input
                      onChange={(e) =>
                        handleChange(
                          user.id,
                          "address",
                          e.target.value,
                          "street"
                        )
                      }
                      value={
                        editUserValues[user.id]?.address?.street ??
                        user.address?.street ??
                        ""
                      }
                      type="text"
                      placeholder="street"
                    />
                  )}
                </div>
              </td>
              <td className={classes.content}>
                <div className={classes.contentUser}>
                  <p>Suite:</p>
                  <p>{user.address?.suite}</p>
                  {edit && (
                    <input
                      onChange={(e) =>
                        handleChange(
                          user.id,
                          "address",
                          e.target.value,
                          "suite"
                        )
                      }
                      value={
                        editUserValues[user.id]?.address?.suite ??
                        user.address?.suite ??
                        ""
                      }
                      type="text"
                      placeholder="suite"
                    />
                  )}
                </div>
              </td>
              <td className={classes.content}>
                <Edit
                  userId={user.id}
                  updateEditUser={editUserValues}
                  users={users}
                />
                <DeleteUser
                  id={user.id}
                  deleteUserHandel={() => deleteUserHandel(user.id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default UsersList;

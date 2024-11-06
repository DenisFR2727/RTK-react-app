import React, { Fragment, useCallback } from "react";
import { setCurrentIdUser, setShowEditUser } from "../../redux/usersSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useUpdateUserMutation } from "../../api";
import { IUsers } from "../../redux/type";
interface EditIdUserProps {
  userId: number;
  updateEditUser: any;
  users: IUsers[];
}
function Edit({ userId, updateEditUser, users }: EditIdUserProps) {
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserMutation();

  const handleUpdateUser = useCallback(async () => {
    dispatch(setCurrentIdUser(userId));
    dispatch(setShowEditUser(true));

    const isEmptyEditUser = Object.keys(updateEditUser).length === 0;

    // Отримуємо поточні дані користувача
    const existingUserData = users.find((user) => user.id === userId);

    if (!isEmptyEditUser) {
      const formattedUpdateData = {
        ...existingUserData,
        ...updateEditUser[userId],
      };
      try {
        await updateUser(formattedUpdateData as IUsers);
        console.log("Оновлені данні", formattedUpdateData);
      } catch (error) {
        console.log("Помилка при оновленні данних", error);
      }
    }
  }, [dispatch, userId, updateEditUser]);
  return (
    <Fragment>
      <button onClick={handleUpdateUser}>Edit</button>
    </Fragment>
  );
}

export default Edit;

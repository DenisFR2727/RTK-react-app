import React, { Fragment, useCallback } from "react";
import { setActiveEditUserId, setCurrentIdUser } from "../../redux/usersSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useUpdateUserMutation } from "../../api";
import { IUsers } from "../../redux/type";
interface EditIdUserProps {
  userId: number;
  updateEditUser: any;
  users: IUsers[];
  isEditing: boolean;
  onToggleEdit: () => void;
}
function Edit({
  userId,
  updateEditUser,
  users,
  isEditing,
  onToggleEdit,
}: EditIdUserProps) {
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserMutation();

  const handleUpdateUser = useCallback(async () => {
    dispatch(setCurrentIdUser(userId));

    const isEmptyEditUser = Object.keys(updateEditUser).length === 0;
    const existingUserData = users.find((user) => user.id === userId); // Отримуємо поточні дані користувача

    if (!isEmptyEditUser && existingUserData) {
      const formattedUpdateData = {
        ...existingUserData,
        ...updateEditUser[userId],
        address: {
          ...existingUserData.address, // Зберігаємо існуючі значення
          ...updateEditUser[userId]?.address, // Перезаписуємо лише оновлені значення
        },
      };
      try {
        await updateUser(formattedUpdateData as IUsers);
        dispatch(setActiveEditUserId(null));
        console.log("Update data", formattedUpdateData);
      } catch (error) {
        console.log("Error update data", error);
      }
    } else {
      onToggleEdit();
      // Якщо немає змін для редагування
      console.log("Немає змін для оновлення");
    }
  }, [userId, updateEditUser, updateUser, users, onToggleEdit]);
  return (
    <Fragment>
      <button onClick={isEditing ? handleUpdateUser : onToggleEdit}>
        {isEditing ? "Send" : "Edit"}
      </button>
    </Fragment>
  );
}
export default Edit;

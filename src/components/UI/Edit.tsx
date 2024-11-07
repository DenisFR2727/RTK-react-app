import React, { Fragment, useCallback, useState } from "react";
import { setCurrentIdUser, setShowEditUser } from "../../redux/usersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
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
  const [isEditing, setIsEditing] = useState<boolean>(false); // Додаємо стан

  const handleToggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
    dispatch(setCurrentIdUser(userId));
    dispatch(setShowEditUser(!isEditing));
  }, [dispatch, userId, isEditing]);

  const handleUpdateUser = useCallback(async () => {
    dispatch(setCurrentIdUser(userId));
    dispatch(setShowEditUser(true));

    const isEmptyEditUser = Object.keys(updateEditUser).length === 0;

    // Отримуємо поточні дані користувача
    const existingUserData = users.find((user) => user.id === userId);

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
        console.log("Оновлені данні", formattedUpdateData);
        setIsEditing(false); //Кнопка змінюється назад на Edit Закриваємо редагування після відправки
        dispatch(setShowEditUser(false)); //Закриваємо редагування після відправки
      } catch (error) {
        console.log("Помилка при оновленні данних", error);
      }
    } else {
      // Якщо немає змін для редагування
      console.log("Немає змін для оновлення");
      setIsEditing(false); // Закриваємо редагування після відправки
      dispatch(setShowEditUser(false));
    }
  }, [dispatch, userId, updateEditUser, updateUser, users]);
  return (
    <Fragment>
      <button onClick={isEditing ? handleUpdateUser : handleToggleEdit}>
        {isEditing ? "Send" : "Edit"}
      </button>
    </Fragment>
  );
}
export default Edit;

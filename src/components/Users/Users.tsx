import { useCallback, useEffect, useState } from "react";
import { useGetUsersQuery } from "../../api";
import UsersList from "./UsersList";
import Loading from "../Loading/Loading";

import "../../styles/animations.scss";
import "animate.css/animate.compat.css";
import "react-animate-on-scroll";
import ScrollAnimation from "react-animate-on-scroll";
import { setDeleteUserId, setShowDeleteModal } from "../../redux/usersSlice";
import { useAppDispatch } from "../../redux/hooks";

function Users() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Штучна затримка на 1.5 секунди перед рендерингом списку
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  const deleteUserHandel = useCallback((userId: number) => {
    dispatch(setShowDeleteModal(true));
    dispatch(setDeleteUserId(userId));
  }, []);

  const list_user = (
    <UsersList users={users} deleteUserHandel={deleteUserHandel} />
  );

  if (loading || isLoading) return <Loading />;
  if (error) return <div>Ошибка...</div>;

  return (
    <div className="users">
      <ScrollAnimation
        animateIn="bounceInRight"
        animateOut="bounceOutLeft"
        offset={1000}
        duration={1.5}
        animateOnce={false}
      >
        <h1>USERS</h1>
      </ScrollAnimation>
      <div className="users-list">{list_user}</div>
    </div>
  );
}
export default Users;

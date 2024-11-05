import React, { Fragment, useCallback } from "react";
import { setCurrentIdUser, setShowEditUser } from "../../redux/usersSlice";
import { useAppDispatch } from "../../redux/hooks";
interface EditIdUserProps {
  userId: number;
}
function Edit({ userId }: EditIdUserProps) {
  const dispatch = useAppDispatch();
  const editUserFromId = useCallback(() => {
    dispatch(setCurrentIdUser(userId));
    dispatch(setShowEditUser(true));
  }, [dispatch, userId]);
  return (
    <Fragment>
      <button onClick={editUserFromId}>Edit</button>
    </Fragment>
  );
}

export default Edit;

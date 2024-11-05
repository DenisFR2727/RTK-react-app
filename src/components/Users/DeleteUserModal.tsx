import Modal from "../UI/Modal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShowDeleteModal } from "../../redux/usersSlice";
import { useDeleteUserMutation } from "../../api";

import classes from "./DeleteModal.module.scss";

function DeleteUserModal() {
  const dispatch = useAppDispatch();
  const userDelId = useAppSelector((state) => state.user.currentIdUser);
  const [setDeleteUser] = useDeleteUserMutation();

  const closeModalDelete = () => {
    dispatch(setShowDeleteModal(false));
  };
  const deleteUserHandel = async () => {
    try {
      await setDeleteUser(userDelId);
      dispatch(setShowDeleteModal(false));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal onClose={closeModalDelete}>
      <div className={classes.deleteUser}>
        <div className={classes.content}>
          <h2>Are you sure you want to delete this user?</h2>
          <button className={classes.deleteBtn} onClick={deleteUserHandel}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteUserModal;

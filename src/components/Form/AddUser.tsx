import React, { Fragment } from "react";
import Modal from "../UI/Modal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShowModalForm } from "../../redux/usersSlice";
import { useFormik } from "formik";
import classes from "./AddUser.module.scss";
import { useAddUserMutation } from "../../api";
import { IUsers } from "../../redux/type";

function AddUser() {
  const dispatch = useAppDispatch();
  const showModalForm = useAppSelector((state) => state.user.isShowModalForm);
  const [addUser] = useAddUserMutation();

  const formik = useFormik<IUsers>({
    initialValues: {
      id: 0,
      name: "",
      username: "",
      email: "",
      address: {
        city: "",
        street: "",
        suite: "",
      },
      phone: "",
    },

    onSubmit: async (values) => {
      try {
        await addUser(values).unwrap();
        dispatch(setShowModalForm(false));
      } catch (error) {
        console.log("Error adding user:", error);
      }
    },
  });

  const closeModalForm = () => {
    dispatch(setShowModalForm(false));
  };

  return (
    <Fragment>
      {showModalForm && (
        <Modal onClose={closeModalForm}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="name"
              onChange={formik.handleChange}
              name="name"
              value={formik.values.name}
            />
            <span></span>
            <label htmlFor="username">User Name:</label>
            <input
              type="text"
              placeholder="username"
              onChange={formik.handleChange}
              name="username"
              value={formik.values.username}
            />
            <span></span>
            <label htmlFor="username">Email:</label>
            <input
              type="email"
              placeholder="email"
              onChange={formik.handleChange}
              name="email"
              value={formik.values.email}
            />
            <span></span>
            <label htmlFor="address">Address:</label>
            <input
              className={classes.address}
              type="text"
              placeholder="city"
              onChange={formik.handleChange}
              name="address.city"
              value={formik.values.address?.city}
            />
            <input
              className={classes.address}
              type="text"
              placeholder="street"
              onChange={formik.handleChange}
              name="address.street"
              value={formik.values.address?.street}
            />
            <input
              className={classes.address}
              type="text"
              placeholder="suite"
              onChange={formik.handleChange}
              name="address.suite"
              value={formik.values.address?.suite}
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              placeholder="phone"
              onChange={formik.handleChange}
              name="phone"
              value={formik.values.phone}
            />
            <button>Send</button>
          </form>
        </Modal>
      )}
    </Fragment>
  );
}
export default AddUser;

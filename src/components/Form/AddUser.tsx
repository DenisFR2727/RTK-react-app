import React, { Fragment } from "react";
import Modal from "../UI/Modal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShowModalForm } from "../../redux/usersSlice";
import { useFormik } from "formik";
import classes from "./AddUser.module.scss";
import { useAddUserMutation } from "../../api";
import { IUsers } from "../../redux/type";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  email: Yup.string()
    .min(2, "Too Short!")
    .email("Invalid email")
    .required("Required"),
  phone: Yup.string().required("Required"),
  address: Yup.object().shape({
    city: Yup.string().required("Required"),
    street: Yup.string().required("Required"),
    suite: Yup.string().required("Required"),
  }),
});

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
    validationSchema: SignupSchema,
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
            {formik.touched.name && formik.errors.name ? (
              <div className={classes.error}>{formik.errors.name}</div>
            ) : null}
            <input
              type="text"
              placeholder="name"
              onChange={formik.handleChange}
              name="name"
              value={formik.values.name}
            />
            <span></span>
            <label htmlFor="username">User Name:</label>
            {formik.touched.username && formik.errors.username ? (
              <div className={classes.error}>{formik.errors.username}</div>
            ) : null}
            <input
              type="text"
              placeholder="username"
              onChange={formik.handleChange}
              name="username"
              value={formik.values.username}
            />
            <span></span>
            <label htmlFor="email">Email:</label>
            {formik.touched.email && formik.errors.email ? (
              <div className={classes.error}>{formik.errors.email}</div>
            ) : null}
            <input
              type="email"
              placeholder="email"
              onChange={formik.handleChange}
              name="email"
              value={formik.values.email}
            />
            <span></span>
            <label htmlFor="address">Address:</label>
            {formik.touched.address?.city && formik.errors.address?.city ? (
              <div className={classes.error}>{formik.errors.address.city}</div>
            ) : null}
            <input
              className={classes.address}
              type="text"
              placeholder="city"
              onChange={formik.handleChange}
              name="address.city"
              value={formik.values.address?.city}
            />
            {formik.touched.address?.street && formik.errors.address?.street ? (
              <div className={classes.error}>
                {formik.errors.address?.street}
              </div>
            ) : null}
            <input
              className={classes.address}
              type="text"
              placeholder="street"
              onChange={formik.handleChange}
              name="address.street"
              value={formik.values.address?.street}
            />
            {formik.touched.address?.suite && formik.errors.address?.suite ? (
              <div className={classes.error}>
                {formik.errors.address?.suite}
              </div>
            ) : null}
            <input
              className={classes.address}
              type="text"
              placeholder="suite"
              onChange={formik.handleChange}
              name="address.suite"
              value={formik.values.address?.suite}
            />
            <label htmlFor="phone">Phone:</label>
            {formik.touched.phone && formik.errors.phone ? (
              <div className={classes.error}>{formik.errors.phone}</div>
            ) : null}
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

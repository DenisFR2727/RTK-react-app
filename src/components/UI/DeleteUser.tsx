import React, { Fragment } from "react";

interface DeleteUserProps {
  deleteUserHandel: (id: number) => void;
  id: number;
}
function DeleteUser({ deleteUserHandel, id }: DeleteUserProps) {
  return (
    <Fragment>
      <button onClick={() => deleteUserHandel(id)}>Delete</button>
    </Fragment>
  );
}

export default DeleteUser;

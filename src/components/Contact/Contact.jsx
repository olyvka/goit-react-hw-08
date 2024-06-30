import { ImUser } from "react-icons/im";
import { ImPhone } from "react-icons/im";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";
import css from "./Contact.module.css";
import {
  deleteContact,
  updateContact,
} from "../../redux/contacts/operations.js";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const UserSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Maximum 30 characters!")
    .required("Required!"),
  userNumber: Yup.string()
    .matches(/^[0-9]*$/, "Need to enter numbers")
    .min(5, "Too Short!")
    .required("Required!"),
});

export default function Contact({ name, number, id }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success(`Contact deleted successfully!`);
        setIsUpdating(false);
      })
      .catch(() =>
        toast.error(`Oops, something went wrong.
          Try again later!`)
      );
  };

  const handleCorrection = (values, actions) => {
    const { userName, userNumber } = values;
    console.log("handleCorrection");

    dispatch(updateContact({ id, name: userName, number: userNumber }))
      .unwrap()
      .then(() => {
        setIsUpdating(false);
        toast.success(`Contact updated successfully!`);
        actions.resetForm();
      })
      .catch(() =>
        toast.error(`Oops, something went wrong. 
        Try again later!`)
      );
  };

  return (
    <div>
      <Formik
        initialValues={{ userName: name, userNumber: number }}
        validationSchema={UserSchema}
        onSubmit={handleCorrection}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form className={css.container}>
            <div className={css.userContainer}>
              <div className={css.userName}>
                <ImUser />
                {isUpdating ? (
                  <div>
                    <Field
                      className={css.input}
                      type="text"
                      name="userName"
                      value={values.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      className={css.error}
                      name="userName"
                      component="span"
                    />
                  </div>
                ) : (
                  <p className={css.name}>{name}</p>
                )}
              </div>

              <div className={css.userPhone}>
                <ImPhone />
                {isUpdating ? (
                  <div>
                    <Field
                      className={css.input}
                      type="text"
                      name="userNumber"
                      value={values.userNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      className={css.error}
                      name="userNumber"
                      component="span"
                    />
                  </div>
                ) : (
                  <p className={css.phone}>{number}</p>
                )}
              </div>
            </div>
            <div className={css.iconContainer}>
              <button
                type="button"
                className={css.btn}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <FaTrashAlt className={css.icon} />
              </button>
              {!isUpdating ? (
                <button
                  type="button"
                  className={css.btn}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsUpdating(true);
                  }}
                >
                  <FaPen className={css.icon} />
                </button>
              ) : (
                <button className={css.btn} type="submit">
                  <BiSolidSave className={css.icon} />
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {showModal && (
        <div className={css.modalOverlay}>
          <div className={css.modalContent}>
            <p>Are you sure you want to delete the contact?</p>
            <div className={css.modalBtnContainer}>
              <button className={css.modalDeleteBtn} onClick={handleDelete}>
                Yes
              </button>
              <button
                className={css.modalCloseBtn}
                onClick={() => {
                  setShowModal(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

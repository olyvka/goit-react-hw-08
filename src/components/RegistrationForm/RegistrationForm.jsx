import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Maximum 30 characters!")
    .required("Required!"),
  email: Yup.string().email("must be a valid email").required("Required!"),
  password: Yup.string().min(3, "Too Short!").required("Required!"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then((data) =>
        toast.success(
          `Successful registration. 
          Name: ${data.user.name}; 
          Email: ${data.user.email}`
        )
      )
      .catch((error) => toast.error(`${error}`));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={UserSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <div className={css.formGroup}>
          <label className={css.label}>
            Username
            <Field className={css.formInput} type="text" name="name" />
            <ErrorMessage className={css.error} name="name" component="span" />
          </label>
          <label className={css.label}>
            Email
            <Field className={css.formInput} type="email" name="email" />
            <ErrorMessage className={css.error} name="email" component="span" />
          </label>
          <label className={css.label}>
            Password
            <Field className={css.formInput} type="password" name="password" />
            <ErrorMessage
              className={css.error}
              name="password"
              component="span"
            />
          </label>
        </div>
        <div className={css.btnContainer}>
          <button className={css.btn} type="submit">
            Register
          </button>
        </div>
      </Form>
    </Formik>
  );
}

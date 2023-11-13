import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import styles from "../Auth.module.css";
import { useForm } from "../../../hooks/useForm";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import Notification from "../../Notification/Notification";

const FORM_KEYS = {
  FirstName: "firstName",
  LastName: "lastName",
  Email: "email",
  Password: "password",
};

const Register = () => {
  useTitle("Register Page");
  const { onRegisterSubmit, errors } =
    useContext(AuthContext);

  const { values, changeHandler, onSubmit } = useForm(
    {
      [FORM_KEYS.FirstName]: "",
      [FORM_KEYS.LastName]: "",
      [FORM_KEYS.Email]: "",
      [FORM_KEYS.Password]: "",
    },
    onRegisterSubmit
  );

  return (
    <section className={styles["register-section"]}>
      <form method="POST" onSubmit={onSubmit}>
        <div>
          <h1>Register</h1>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="firstname">First Name:</label>
          <div>
            <i className="fas fa-id-card"></i>
            <input
              type="text"
              id="firstname"
              placeholder="John"
              name={FORM_KEYS.FirstName}
              value={values[FORM_KEYS.FirstName]}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="lastname">Last Name:</label>
          <div>
            <i className="fas fa-id-card"></i>
            <input
              type="text"
              id="lastname"
              placeholder="Doe"
              name={FORM_KEYS.LastName}
              value={values[FORM_KEYS.LastName]}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="email">Email</label>
          <div>
            <i className="fas fa-user-circle"></i>
            <input
              type="text"
              id="email"
              placeholder="johndoe@gmail.com"
              name={FORM_KEYS.Email}
              value={values[FORM_KEYS.Email]}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Password</label>
          <div>
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              id="password"
              placeholder="************"
              name={FORM_KEYS.Password}
              value={values[FORM_KEYS.Password]}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className={styles["btns"]}>
          <button type="submit">Register</button>
        </div>
        <Link to="/login">Already have an account?</Link>
      </form>
      {errors.length > 0 && (
        <div className={styles["errors-container"]}>
          {errors.map((e) => (
            <Notification
              text={e}
              type={"error"}
              key={e.length}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Register;

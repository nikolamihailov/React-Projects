import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import styles from "../Auth.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "../../../hooks/useForm";

const FORM_KEYS = {
  Email: "email",
  Password: "password",
};

const Login = () => {
  useTitle("Login Page");
  const { onLoginSubmit } = useContext(AuthContext);

  const { values, changeHandler, onSubmit } = useForm(
    {
      [FORM_KEYS.Email]: "",
      [FORM_KEYS.Password]: "",
    },
    onLoginSubmit
  );

  return (
    <section className={styles["login-section"]}>
      <form method="POST" onSubmit={onSubmit}>
        <div>
          <h1>Login</h1>
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
          <button type="submit">Sign in</button>
        </div>

        <Link to="/register"> Do not have an account?</Link>
      </form>
    </section>
  );
};

export default Login;

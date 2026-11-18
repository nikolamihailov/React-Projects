import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import styles from "../LoginRegister.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { login } from "../../../data/services/userService";
import { NotifContext } from "../../../contexts/NotificationContext";

const FORM_KEYS = {
  Email: "email",
  Password: "password",
};

// Labelled password input with a show/hide toggle (also used by Register).
export const PasswordField = ({ id, name, value, onChange, autoComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles["field"]}>
      <label htmlFor={id}>Password</label>
      <div className={`${styles["control"]} ${styles["has-toggle"]}`}>
        <i className="fa-solid fa-lock" aria-hidden="true"></i>
        <input
          type={isVisible ? "text" : "password"}
          id={id}
          placeholder="••••••••"
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className={styles["toggle"]}
          onClick={() => setIsVisible((v) => !v)}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
        >
          <i className={`fa-regular ${isVisible ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export const ErrorList = ({ errors }) =>
  errors.length > 0 && (
    <ul className={styles["errors"]} role="alert">
      {errors.map((e, i) => (
        <li key={i}>{e}</li>
      ))}
    </ul>
  );

const Login = () => {
  useTitle("Login Page | KolPlace");
  const { updateAuth } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  const [errors, setErrors] = useState([]);
  const [values, setValues] = useState({
    [FORM_KEYS.Email]: "",
    [FORM_KEYS.Password]: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({ ...state, [name]: value }));
    setErrors([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (values[FORM_KEYS.Email].trim() === "") {
      setErrors(["Email must be filled!"]);
      setIsLoading(false);
      return;
    }
    if (values[FORM_KEYS.Password].trim() === "") {
      setErrors(["Password must be filled!"]);
      setIsLoading(false);
      return;
    }

    const userData = await login(values);
    if (userData.errors) {
      const errs = Object.values(userData.errors);
      setErrors(errs);
      setIsLoading(false);
    } else {
      updateNotifs([{ text: "You successfully logged in!", type: "success" }]);
      updateAuth(userData);
      setErrors([]);
      navigateTo("/");
    }
  };

  return (
    <section className={styles["auth-page"]}>
      <form className={styles["card"]} method="POST" onSubmit={onSubmit} noValidate>
        <div className={styles["heading"]}>
          <h1>Sign in</h1>
          <p>Welcome back! Sign in to your KolPlace account.</p>
        </div>

        <ErrorList errors={errors} />

        <div className={styles["field"]}>
          <label htmlFor="email">Email</label>
          <div className={styles["control"]}>
            <i className="fa-regular fa-envelope" aria-hidden="true"></i>
            <input
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              name={FORM_KEYS.Email}
              value={values[FORM_KEYS.Email]}
              onChange={changeHandler}
              autoComplete="email"
            />
          </div>
        </div>

        <PasswordField
          id="password"
          name={FORM_KEYS.Password}
          value={values[FORM_KEYS.Password]}
          onChange={changeHandler}
          autoComplete="current-password"
        />

        <button type="submit" className={styles["primary"]} disabled={isLoading} aria-busy={isLoading}>
          {isLoading ? <i className="fa-solid fa-spinner fa-spin" aria-label="Signing in"></i> : "Sign in"}
        </button>

        <p className={styles["switch"]}>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;

import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import styles from "../LoginRegister.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Notification from "../../Notifications/Notification";
import { login } from "../../../data/services/userService";
import { v4 as uuidv4 } from "uuid";
import { NotifContext } from "../../../contexts/NotificationContext";

const FORM_KEYS = {
  Email: "email",
  Password: "password",
};

const Login = () => {
  useTitle("Login Page | KolPlace");
  const { updateAuth } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);
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
    if (values[FORM_KEYS.Email].trim() === "") {
      updateNotifs([{ text: "Email must be filled!", type: "error" }]);
      return;
    }
    if (values[FORM_KEYS.Password].trim() === "") {
      updateNotifs([{ text: "Password must be filled!", type: "error" }]);
      return;
    }
    const userData = await login(values);
    if (userData.errors) {
      const errs = Object.values(userData.errors);
      setErrors(errs);
    } else {
      updateNotifs([{ text: "You successfully logged in!", type: "success" }]);
      updateAuth(userData);
      setErrors([]);
      navigateTo("/");
    }
  };

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
      {errors.length > 0 && (
        <div className={styles["errors-container"]}>
          {errors.map((e) => (
            <Notification text={e} type={"error"} key={uuidv4()} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Login;

import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import styles from "../Auth.module.css";

const Login = () => {
  useTitle("Login Page");
  return (
    <section className={styles["login-section"]}>
      <form>
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
              name="email"
              placeholder="johndoe@gmail.com"
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
              name="password"
              placeholder="************"
            />
          </div>
        </div>

        <div className={styles["btns"]}>
          <button type="submit">Sign in</button>
          <button>Reset</button>
        </div>

        <Link to="/register"> Do not have an account?</Link>
      </form>
    </section>
  );
};

export default Login;

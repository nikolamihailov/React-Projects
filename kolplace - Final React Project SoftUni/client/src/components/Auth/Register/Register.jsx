import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import styles from "../Auth.module.css";

const Register = () => {
  useTitle("Register Page");
  return (
    <section className={styles["register-section"]}>
      <form method="POST">
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
              name="firstname"
              placeholder="John"
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
              name="lastname"
              placeholder="Doe"
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
          <button type="submit">Register</button>
        </div>
        <Link to="/login">Already have an account?</Link>
      </form>
    </section>
  );
};

export default Register;

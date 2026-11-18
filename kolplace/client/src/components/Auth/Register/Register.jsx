import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import styles from "../LoginRegister.module.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useState } from "react";
import { register } from "../../../data/services/userService";
import { NotifContext } from "../../../contexts/NotificationContext";
import { ErrorList, PasswordField } from "../Login/Login";

const FORM_KEYS = {
  FirstName: "firstName",
  LastName: "lastName",
  Email: "email",
  Password: "password",
};

const Register = () => {
  useTitle("Register Page | KolPlace");
  const { updateAuth } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  const [errors, setErrors] = useState([]);
  const [values, setValues] = useState({
    [FORM_KEYS.FirstName]: "",
    [FORM_KEYS.LastName]: "",
    [FORM_KEYS.Email]: "",
    [FORM_KEYS.Password]: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({ ...state, [name]: value }));
    setErrors([]);
  };

  const isInputValid = (input, message) => {
    if (input.trim() === "") {
      setErrors([message]);
      setIsLoading(false);
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isInputValid(values[FORM_KEYS.FirstName], "First name must be filled!")) return;
    if (!isInputValid(values[FORM_KEYS.LastName], "Last name must be filled!")) return;
    if (!isInputValid(values[FORM_KEYS.Email], "Email must be filled!")) return;
    if (!isInputValid(values[FORM_KEYS.Password], "Password must be filled!")) return;

    const userData = await register(values);

    if (userData.errors) {
      setErrors(Object.values(userData.errors));
      setIsLoading(false);
    } else {
      updateAuth(userData);
      updateNotifs([{ text: "You successfully registered!", type: "success" }]);
      setErrors([]);
      navigateTo("/");
    }
  };

  return (
    <section className={styles["auth-page"]}>
      <form className={`${styles["card"]} ${styles["card-wide"]}`} method="POST" onSubmit={onSubmit} noValidate>
        <div className={styles["heading"]}>
          <h1>Create an account</h1>
          <p>Register to save favourites, check out faster and track your orders.</p>
        </div>

        <ErrorList errors={errors} />

        <div className={styles["row"]}>
          <div className={styles["field"]}>
            <label htmlFor="firstname">First name</label>
            <div className={styles["control"]}>
              <i className="fa-regular fa-user" aria-hidden="true"></i>
              <input
                type="text"
                id="firstname"
                placeholder="John"
                name={FORM_KEYS.FirstName}
                value={values[FORM_KEYS.FirstName]}
                onChange={changeHandler}
                autoComplete="given-name"
              />
            </div>
          </div>
          <div className={styles["field"]}>
            <label htmlFor="lastname">Last name</label>
            <div className={styles["control"]}>
              <i className="fa-regular fa-user" aria-hidden="true"></i>
              <input
                type="text"
                id="lastname"
                placeholder="Doe"
                name={FORM_KEYS.LastName}
                value={values[FORM_KEYS.LastName]}
                onChange={changeHandler}
                autoComplete="family-name"
              />
            </div>
          </div>
        </div>

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
          autoComplete="new-password"
        />

        <button type="submit" className={styles["primary"]} disabled={isLoading} aria-busy={isLoading}>
          {isLoading ? <i className="fa-solid fa-spinner fa-spin" aria-label="Creating account"></i> : "Create account"}
        </button>

        <p className={styles["switch"]}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;

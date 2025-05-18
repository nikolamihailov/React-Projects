import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import styles from "../LoginRegister.module.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useState } from "react";
import Notification from "../../Notifications/Notification";
import { register } from "../../../data/services/userService";
import { v4 as uuidv4 } from "uuid";
import { NotifContext } from "../../../contexts/NotificationContext";

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
      updateNotifs([{ text: message, type: "error" }]);
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
          <button type="submit">{isLoading ? <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "24px", color: "white" }}></i> : "Register"}</button>
        </div>
        <Link to="/login">Already have an account?</Link>
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

export default Register;

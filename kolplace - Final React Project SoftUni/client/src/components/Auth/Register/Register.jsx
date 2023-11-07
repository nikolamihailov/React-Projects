import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const Register = () => {
  useTitle("Register Page");
  return (
    <section>
      <div>
        <h1>Register</h1>
      </div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
          />
        </div>

        <p>
          Already have an account?
          <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;

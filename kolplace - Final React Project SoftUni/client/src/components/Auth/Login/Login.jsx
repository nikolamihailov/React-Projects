import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const Login = () => {
  useTitle("Login Page");
  return (
    <section>
      <div>
        <h1>Login</h1>
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
          Do not have account?
          <Link to={"/register"}>Register</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;

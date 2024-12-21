import styles from "./error.module.css";

const Error = () => {
  return (
    <div className={styles.error}>
      <h1>We are sorry, the webiste is experiencing problems!</h1>
      <h3>
        <i>We will be back soon</i>
      </h3>
      <img src="/src/assets/error.png" alt="error" />
    </div>
  );
};

export default Error;

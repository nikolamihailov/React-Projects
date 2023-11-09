import useTitle from "../../hooks/useTitle";
import styles from "./Home.module.css";

const Home = () => {
  useTitle("KolPlace - Your Shopping Place");
  return (
    <section className={styles["home"]}>
      <h1>Home Page</h1>
    </section>
  );
};

export default Home;

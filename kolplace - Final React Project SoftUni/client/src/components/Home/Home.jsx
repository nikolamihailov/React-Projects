import useTitle from "../../hooks/useTitle";
import styles from "./Home.module.css";

const Home = () => {
  useTitle("KolPlace - Your Shopping Place");
  return (
    <section className={styles["home"]}>
      <h1>Home Page</h1>
      <div
        style={{
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        <img
          src="https://smartphone.bg/system/images/421908/original/mtv73rxa.png"
          alt=""
          style={{
            height: "300px",
            width: "400px",
            filter: "drop-shadow(0 0 3px var(--primary-color))",
          }}
        />
        <h2>Iphone 15 Pro Max</h2>
        <p>$999</p>
      </div>
    </section>
  );
};

export default Home;

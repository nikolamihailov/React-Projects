import { useEffect } from "react";
import useTitle from "../../hooks/useTitle";
import styles from "./About.module.css";
import L from "leaflet";

const About = () => {
  useTitle("About Us | KolPlace");

  useEffect(() => {
    // Sample store data with coordinates
    const storeData = [
      { name: "KolPlace (Sofia) Main", coordinates: [42.6977, 23.3219] },
      { name: "KolPlace (Sofia)", coordinates: [42.6629, 23.3726] },
      { name: "KolPlace (Plovdiv) Main", coordinates: [42.1354, 24.7453] },
      { name: "KolPlace (Plovdiv)", coordinates: [42.154, 24.7541] },
      { name: "KolPlace (Varna)", coordinates: [43.214, 27.9147] },
      { name: "KolPlace (Burgas)", coordinates: [42.5048, 27.4626] },
    ];

    const leafletMap = L.map("map").setView([42.6977, 25.2866], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(leafletMap);

    storeData.forEach((store) => {
      const marker = L.marker(store.coordinates).addTo(leafletMap);
      marker.bindPopup(`<b>${store.name}</b>`).openPopup();
    });

    // Cleanup function
    return () => {
      // Optionally, you can clean up resources when the component is unmounted
      if (leafletMap) {
        leafletMap.remove();
      }
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <section className={styles["about-us-section"]}>
      <div className={styles["info"]}>
        <h1>About us</h1>
        <p>
          Welcome to KolPlace, where the joy extends beyond just selecting your
          latest acquisition. Whether it&apos;s a trending video game, a
          challenging puzzle, or a beloved book, we invite you to indulge in an
          experience that transforms your personal time into precious moments.
          At KolPlace, we believe in making every moment special, whether
          it&apos;s for yourself or someone close to you. Discover everything
          you need in one place at KolPlace! Our website is designed with you in
          mind – a user-friendly interface that makes browsing a pleasure. From
          effortless navigation to a hassle-free checkout process, we prioritize
          a smooth and enjoyable online shopping journey. <br />
          <br />
          KolPlace is more than an e-commerce platform, it&apos;s a tech-forward
          destination where innovation meets entertainment. Join us in
          celebrating the perfect blend of cutting-edge technology, captivating
          reads, and unique lifestyle products.
        </p>
      </div>
      <div className={styles["contact-section"]}>
        <p>Have questions or need assistance? Reach out to us!</p>
        <p>
          Email:
          <a href="mailto:kolplace_km@gmail.com">kolplace_km@gmail.com</a>
        </p>
        <p>
          Phone: <a href="tel:+44 20 7946 0443">+44 20 7946 0443</a>
        </p>
      </div>
      <div id="map" className={styles["map"]}></div>
    </section>
  );
};

export default About;

import L from "leaflet";
import styles from "../About.module.css";
import { useEffect } from "react";
import { getAll } from "../../../data/services/storeService";
import mapIcon from "../../../assets/favicon.png";

const Map = () => {
  useEffect(() => {
    getAll().then((data) => {
      const storeData = [];
      data.forEach((s) => {
        const [lati, logi] = s.coordinates.split(", ");
        const coordinates = [Number(lati), Number(logi)];
        const name = `KolPlace ${s.city}`;
        storeData.push({ name, coordinates });
      });
      const leafletMap = L.map("map").setView([42.6977, 25.2866], 7);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(leafletMap);

      storeData.forEach((store) => {
        /*.......................................... */
        L.marker(store.coordinates)
          .addTo(leafletMap)
          .bindPopup(
            L.popup({
              maxWidth: 380,
              minWidth: 130,
              autoClose: false,
              closeOnClick: false,
              className: `store-popup`,
            })
          )
          .setPopupContent(
            `
            <div id="popup-con">
            <img
              id="popup-image"
              src=${mapIcon}
              alt="Store Image"
            />
              <b>${store.name}</b>
              </div>`
          )
          .openPopup();
      });
    });
  }, []);

  return <div id="map" className={styles["map"]}></div>;
};

export default Map;

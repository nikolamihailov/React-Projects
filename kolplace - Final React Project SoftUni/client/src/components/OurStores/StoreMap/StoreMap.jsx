import { useEffect, useState } from "react";
import L from "leaflet";
import { getOne } from "../../../data/services/storeService";
import styles from "./StoreMap.module.css";

const StoreMap = ({ id, onClose }) => {
  const [store, setStore] = useState(null);
  useEffect(() => {
    getOne(id).then((data) => {
      setStore(data);

      const [lati, logi] = data.coordinates.split(", ");
      const coordinates = [Number(lati), Number(logi)];
      const name = `KolPlace ${data.city}`;
      const leafletMap = L.map("map").setView([lati, logi], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(leafletMap);

      L.marker(coordinates)
        .addTo(leafletMap)
        .bindPopup(
          L.popup({
            maxWidth: 380,
            minWidth: 100,
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
              src="/src/assets/favicon.png"
              alt="Store Image"
            />
              <b>${name}</b>
              </div>`
        )
        .openPopup();
    });
  }, [id]);
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div className={styles["store-big-map"]}>
        <h2>
          <i className="fa-solid fa-location-dot"></i>
          KolPlace {store?.city}
        </h2>
        <p>
          {" "}
          <i className="fa-solid fa-phone"></i>
          <a href={`tel:${store?.phone}`}>{store?.phone}</a>
        </p>
        <div id="map" className={styles["map"]}></div>
      </div>
    </>
  );
};
export default StoreMap;

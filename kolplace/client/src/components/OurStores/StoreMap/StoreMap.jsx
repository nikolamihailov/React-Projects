import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { getOne } from "../../../data/services/storeService";
import styles from "./StoreMap.module.css";
import mapIcon from "../../../assets/favicon.png";

const StoreMap = ({ id, onClose }) => {
  const [store, setStore] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let leafletMap = null;
    let cancelled = false;

    getOne(id).then((data) => {
      if (cancelled || !containerRef.current) return;
      setStore(data);

      const [lati, logi] = data.coordinates.split(", ");
      const coordinates = [Number(lati), Number(logi)];
      const name = `KolPlace ${data.city}`;
      leafletMap = L.map(containerRef.current).setView(coordinates, 12);

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
              src=${mapIcon}
              alt="Store Image"
            />
              <b>${name}</b>
              </div>`
        )
        .openPopup();
    });

    return () => {
      cancelled = true;
      leafletMap?.remove();
    };
  }, [id]);

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div
        className={styles["store-big-map"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby="store-map-title"
      >
        <div className={styles["top"]}>
          <div className={styles["heading"]}>
            <h2 id="store-map-title">
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              KolPlace {store?.city}
            </h2>
            {store?.phone && (
              <a className={styles["phone"]} href={`tel:${store.phone}`}>
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
                {store.phone}
              </a>
            )}
          </div>
          <button
            type="button"
            className={styles["close"]}
            onClick={onClose}
            aria-label="Close map"
            autoFocus
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
        <div className={styles["map-card"]}>
          <div ref={containerRef} className={styles["map"]}></div>
        </div>
      </div>
    </>
  );
};
export default StoreMap;

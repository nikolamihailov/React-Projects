import L from "leaflet";
import styles from "../About.module.css";
import { useEffect, useRef } from "react";
import { getAll } from "../../../data/services/storeService";
import mapIcon from "../../../assets/favicon.png";

const Map = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let leafletMap = null;
    let cancelled = false;

    getAll()
      .then((data) => {
        if (cancelled || !containerRef.current) return;

        const storeData = data.map((s) => {
          const [lati, logi] = s.coordinates.split(", ");
          return {
            name: `KolPlace ${s.city}`,
            coordinates: [Number(lati), Number(logi)],
          };
        });

        leafletMap = L.map(containerRef.current).setView([42.6977, 25.2866], 7);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(leafletMap);

        storeData.forEach((store) => {
          L.marker(store.coordinates)
            .addTo(leafletMap)
            .bindPopup(
              L.popup({
                maxWidth: 380,
                minWidth: 130,
                autoClose: false,
                closeOnClick: false,
                autoPan: false,
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

        if (storeData.length > 0) {
          leafletMap.fitBounds(
            L.latLngBounds(storeData.map((s) => s.coordinates)),
            { padding: [48, 48], maxZoom: 9 }
          );
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      leafletMap?.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles["map"]}
      role="region"
      aria-label="Map of KolPlace stores"
    ></div>
  );
};

export default Map;

import { useContext, useState } from "react";
import styles from "./AddStore.module.css";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Notification from "../../../Notifications/Notification";
import { convertToBase64 } from "../../../../utils/convertToBase64";
import imageCompression from "browser-image-compression";
import { createStore } from "../../../../data/services/storeService";
import { useShowHide } from "../../../../hooks/useShowHide";

const FORM_VALUES = {
  City: "city",
  Phone: "phone",
  StoreImage: "storeImage",
  Coordinates: "coordinates",
};

const AddStore = ({ onClose }) => {
  const [values, setValues] = useState({
    [FORM_VALUES.City]: "",
    [FORM_VALUES.Phone]: "",
    [FORM_VALUES.StoreImage]: "",
    [FORM_VALUES.Coordinates]: "",
  });
  const { showHide, isOpen } = useShowHide();

  const navigateTo = useNavigate();
  const [errors, setErrors] = useState([]);
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  const onChange = async (e) => {
    if (e.target.name === "storeImage") {
      const file = e.target.files[0];
      const compressedFile = await imageCompression(file, { maxSizeMB: 0.5 });
      const result = await convertToBase64(compressedFile);
      setValues((state) => ({ ...state, [e.target.name]: result }));
    } else {
      setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    }
    setErrors([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const store = await createStore(values);
    if (store.expMessage) {
      updateNotifs([{ text: store.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
    }
    if (store.errors) {
      setErrors(Object.values(store.errors));
    } else {
      updateNotifs([
        { text: `Store KolPlace - ${store.city} added!`, type: "success" },
      ]);
      setErrors([]);
      onClose();
      navigateTo("/admin-panel/stores");
    }
  };

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <form onSubmit={onSubmit} className={styles["add-store"]}>
        <div className={styles["form-group"]}>
          <label
            htmlFor={FORM_VALUES.StoreImage}
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
            }}
          >
            StoreImage (Max Size - 15MB)
            <img
              src={values[FORM_VALUES.StoreImage] || "/src/assets/store.jpg"}
              alt="StoreImage"
              accept=".jpeg, .png, .jpg"
            />
          </label>
          <input
            type="file"
            onChange={onChange}
            name={FORM_VALUES.StoreImage}
            id={FORM_VALUES.StoreImage}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor={FORM_VALUES.City}>Store City</label>
          <input
            type="text"
            name={FORM_VALUES.City}
            id={FORM_VALUES.City}
            placeholder="Sofia"
            value={values[FORM_VALUES.City]}
            onChange={onChange}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor={FORM_VALUES.Phone}>Phone</label>
          <input
            type="text"
            name={FORM_VALUES.Phone}
            id={FORM_VALUES.Phone}
            placeholder="0876543210"
            value={values[FORM_VALUES.Phone]}
            onChange={onChange}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor={FORM_VALUES.Coordinates}>Coordinates</label>
          <i className="fa-solid fa-circle-info" onClick={showHide}></i>
          <input
            type="text"
            name={FORM_VALUES.Coordinates}
            id={FORM_VALUES.Coordinates}
            placeholder="42.02385777554838, 24.866073294743014"
            value={values[FORM_VALUES.Coordinates]}
            onChange={onChange}
          />
        </div>
        {isOpen && (
          <div className={styles["info-co"]}>
            Coordinates Info: On your computer, open Google Maps. Right-click
            the place or area on the map. This will open a pop-up window. You
            can find your latitude and longitude in decimal format at the top.
          </div>
        )}

        <button type="submit">Add</button>
      </form>
      {errors.length > 0 && (
        <div className={styles["errors-container"]}>
          {errors.map((e) => (
            <Notification text={e} type={"error"} key={uuidv4()} />
          ))}
        </div>
      )}
    </>
  );
};

export default AddStore;

import { useContext, useEffect, useState } from "react";
import styles from "../AddStoreItem/AddStore.module.css";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Notification from "../../../Notifications/Notification";
import { convertToBase64 } from "../../../../utils/convertToBase64";
import imageCompression from "browser-image-compression";
import { getOne, updateStore } from "../../../../data/services/storeService";
import { useShowHide } from "../../../../hooks/useShowHide";
import Spinner from "../../../Spinner/Spinner";

const FORM_VALUES = {
  City: "city",
  Phone: "phone",
  StoreImage: "storeImage",
  Coordinates: "coordinates",
};

const EditStore = ({ onClose, id, updateStores }) => {
  const [values, setValues] = useState({
    [FORM_VALUES.City]: "",
    [FORM_VALUES.Phone]: "",
    [FORM_VALUES.StoreImage]: "",
    [FORM_VALUES.Coordinates]: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getOne(id)
      .then((store) =>
        setValues({
          [FORM_VALUES.City]: store.city,
          [FORM_VALUES.Phone]: store.phone,
          [FORM_VALUES.StoreImage]: store.storeImage,
          [FORM_VALUES.Coordinates]: store.coordinates,
        })
      )
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [id]);
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
    if (values[FORM_VALUES.City].trim() === "") {
      updateNotifs([{ text: "City must be filled!", type: "error" }]);
      return;
    }
    if (values[FORM_VALUES.Phone].trim() === "") {
      updateNotifs([{ text: "Phone must be filled!", type: "error" }]);
      return;
    }
    if (values[FORM_VALUES.StoreImage].trim() === "") {
      updateNotifs([{ text: "Store Image must be filled!", type: "error" }]);
      return;
    }
    if (values[FORM_VALUES.Coordinates].trim() === "") {
      updateNotifs([{ text: "Coordinates must be filled!", type: "error" }]);
      return;
    }
    const updatedStore = await updateStore(id, values);
    if (updatedStore.expMessage) {
      updateNotifs([{ text: updatedStore.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
    }
    if (updatedStore.errors) {
      setErrors(Object.values(updatedStore.errors));
    } else {
      updateStores((stores) => stores.map((s) => (s._id === updatedStore._id ? updatedStore : s)));
      updateNotifs([
        {
          text: `Store KolPlace - ${updatedStore.city} updated!`,
          type: "success",
        },
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
        {isLoading ? (
          <Spinner />
        ) : (
          <>
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
                Coordinates Info: On your computer, open Google Maps. Right-click the place or area
                on the map. This will open a pop-up window. You can find your latitude and longitude
                in decimal format at the top.
              </div>
            )}
            <button type="submit">Edit</button>
          </>
        )}
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

export default EditStore;

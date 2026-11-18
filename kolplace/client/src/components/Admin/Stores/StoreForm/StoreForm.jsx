import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStore, getOne, updateStore } from "../../../../data/services/storeService";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import AdminModal, { ModalButton } from "../../AdminModal/AdminModal";
import form from "../../AdminModal/AdminForm.module.css";
import ImageUpload from "../../../ImageUpload/ImageUpload";
import storeFallback from "../../../../assets/store.jpg";

const FIELDS = [
  { name: "city", label: "City", placeholder: "Sofia" },
  { name: "phone", label: "Phone", placeholder: "0876543210" },
];

// Add (no id) or edit (id) a store. onSaved(store, isNew) lets the list update.
const StoreForm = ({ id, onClose, onSaved }) => {
  const isEdit = Boolean(id);
  const [values, setValues] = useState({ city: "", phone: "", coordinates: "", storeImage: "" });
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!isEdit) return;
    getOne(id)
      .then((s) =>
        setValues({ city: s.city, phone: s.phone, coordinates: s.coordinates, storeImage: s.storeImage || "" })
      )
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [id, isEdit]);

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const missing = [];
    if (!values.city.trim()) missing.push("City must be filled!");
    if (!values.phone.trim()) missing.push("Phone must be filled!");
    if (!values.coordinates.trim()) missing.push("Coordinates must be filled!");
    if (!values.storeImage) missing.push("Store image is required!");
    if (missing.length) return setErrors(missing);

    setIsSaving(true);
    const result = isEdit ? await updateStore(id, values) : await createStore(values);
    setIsSaving(false);

    if (result.expMessage) {
      updateNotifs([{ text: result.expMessage, type: "error" }]);
      updateAuth({});
      navigateTo("/login");
      return;
    }
    if (result.errors) {
      setErrors(Object.values(result.errors));
      return;
    }
    updateNotifs([
      { text: `Store KolPlace - ${result.city} ${isEdit ? "updated" : "added"}!`, type: "success" },
    ]);
    onSaved?.(result, !isEdit);
    onClose();
  };

  return (
    <AdminModal
      as="form"
      onSubmit={onSubmit}
      title={isEdit ? "Edit store" : "Add store"}
      onClose={onClose}
      isLoading={isLoading}
      footer={
        <>
          <ModalButton onClick={onClose}>Cancel</ModalButton>
          <ModalButton type="submit" variant="primary" disabled={isUploading || isSaving}>
            {isUploading ? "Uploading image..." : isSaving ? "Saving..." : isEdit ? "Save changes" : "Add store"}
          </ModalButton>
        </>
      }
    >
      <div className={form["form"]}>
        {errors.length > 0 && (
          <ul className={form["errors"]} role="alert">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <ImageUpload
          name="storeImage"
          label="Image"
          value={values.storeImage}
          folder="stores"
          fallback={storeFallback}
          alt={`${values.city} store`}
          className={form["image-single"]}
          onChange={(name, url) => {
            setValues((v) => ({ ...v, [name]: url }));
            setErrors([]);
          }}
          onBusyChange={setIsUploading}
        />
        <div className={form["row"]}>
          {FIELDS.map((f) => (
            <label key={f.name} className={form["field"]}>
              {f.label}
              <input name={f.name} value={values[f.name]} placeholder={f.placeholder} onChange={onChange} />
            </label>
          ))}
        </div>
        <label className={form["field"]}>
          Coordinates
          <input
            name="coordinates"
            value={values.coordinates}
            placeholder="42.0238, 24.8660"
            onChange={onChange}
            aria-describedby="coordinates-help"
          />
          <small id="coordinates-help" style={{ fontWeight: 400, opacity: 0.75 }}>
            In Google Maps, right-click the store&apos;s location; the latitude and longitude are shown at
            the top of the menu.
          </small>
        </label>
      </div>
    </AdminModal>
  );
};

export default StoreForm;

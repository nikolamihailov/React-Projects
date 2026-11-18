import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory, editCategory, getOneCategory } from "../../../../data/services/categoryService";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import AdminModal, { ModalButton } from "../../AdminModal/AdminModal";
import form from "../../AdminModal/AdminForm.module.css";
import ImageUpload from "../../../ImageUpload/ImageUpload";
import noImage from "../../../../assets/no-image.jpg";

// Add (no id) or edit (id) a category. onSaved(category, isNew) lets the list update.
const CategoryForm = ({ id, onClose, onSaved }) => {
  const isEdit = Boolean(id);
  const [values, setValues] = useState({ name: "", categoryImage: "" });
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!isEdit) return;
    getOneCategory(id)
      .then((c) => setValues({ name: c.name, categoryImage: c.categoryImage || "" }))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [id, isEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const missing = [];
    if (!values.name.trim()) missing.push("Name must be filled!");
    if (!values.categoryImage) missing.push("Category image is required!");
    if (missing.length) return setErrors(missing);

    setIsSaving(true);
    const result = isEdit ? await editCategory(id, values) : await createCategory(values);
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
      { text: `Category - ${result.name} ${isEdit ? "updated" : "added"}!`, type: "success" },
    ]);
    onSaved?.(result, !isEdit);
    onClose();
  };

  return (
    <AdminModal
      as="form"
      onSubmit={onSubmit}
      title={isEdit ? "Edit category" : "Add category"}
      onClose={onClose}
      isLoading={isLoading}
      footer={
        <>
          <ModalButton onClick={onClose}>Cancel</ModalButton>
          <ModalButton type="submit" variant="primary" disabled={isUploading || isSaving}>
            {isUploading ? "Uploading image..." : isSaving ? "Saving..." : isEdit ? "Save changes" : "Add category"}
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
        <label className={form["field"]}>
          Name
          <input
            name="name"
            value={values.name}
            placeholder="Games"
            onChange={(e) => {
              setValues((v) => ({ ...v, name: e.target.value }));
              setErrors([]);
            }}
          />
        </label>
        <ImageUpload
          name="categoryImage"
          label="Image"
          value={values.categoryImage}
          folder="categories"
          fallback={noImage}
          alt={values.name}
          className={form["image-single"]}
          onChange={(name, url) => {
            setValues((v) => ({ ...v, [name]: url }));
            setErrors([]);
          }}
          onBusyChange={setIsUploading}
        />
      </div>
    </AdminModal>
  );
};

export default CategoryForm;

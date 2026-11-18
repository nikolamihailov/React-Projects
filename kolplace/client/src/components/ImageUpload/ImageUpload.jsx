import { useEffect, useState } from "react";
import styles from "./ImageUpload.module.css";
import { uploadImage } from "../../data/services/uploadService";

// File picker that uploads straight away and hands the stored URL back to the
// form through onChange(name, url), so forms keep saving plain URLs.
const ImageUpload = ({
  name,
  label,
  value,
  folder,
  fallback,
  alt = "",
  optional = false,
  onChange,
  onBusyChange,
  className = "",
}) => {
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  // Free the local preview when it is replaced or the form closes.
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const onFile = async (e) => {
    const file = e.target.files[0];
    e.target.value = ""; // allow picking the same file again after an error
    if (!file) return;

    setError("");
    setPreview(URL.createObjectURL(file));
    setIsUploading(true);
    onBusyChange?.(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(name, url);
    } catch (err) {
      setError(err.message);
    } finally {
      setPreview(null);
      setIsUploading(false);
      onBusyChange?.(false);
    }
  };

  return (
    <div className={`${styles["image-upload"]} ${className}`}>
      <label className={styles["picker"]}>
        <span>{label}</span>
        <span className={styles["frame"]}>
          <img src={preview || value || fallback} alt={alt} />
          {isUploading && <span className={styles["overlay"]}>Uploading…</span>}
        </span>
        <span className={styles["hint"]}>
          {value ? "Click to change" : "Click to choose an image"}
        </span>
        <input
          type="file"
          accept="image/*"
          name={name}
          onChange={onFile}
          disabled={isUploading}
          className={styles["file-input"]}
        />
      </label>
      {optional && value && !isUploading && (
        <button type="button" className={styles["remove"]} onClick={() => onChange(name, "")}>
          Remove
        </button>
      )}
      {error && <p className={styles["error"]}>{error}</p>}
    </div>
  );
};

export default ImageUpload;

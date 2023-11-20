// import { useState } from "react";
import styles from "./AddProduct.module.css";

const AddProductItem = ({ onClose }) => {
  /*   const [images, setImages] = useState([""]);
  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, ""]);
  };

  const removeImageField = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
*/
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Images submitted:", images);
  };
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <p>Add product</p>
      <form onSubmit={handleSubmit} className={styles["add-product"]}>
        {/* {images.map((image, index) => (
          <div key={index}>
            <label htmlFor={`image-${index}`}>Image {index + 1}:</label>
            <input
              type="text"
              id={`image-${index}`}
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              required
            />
            <button type="button" onClick={() => removeImageField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addImageField}>
          Add Image
        </button>
       <button type="submit">Submit</button>*/}
      </form>
    </>
  );
};

export default AddProductItem;

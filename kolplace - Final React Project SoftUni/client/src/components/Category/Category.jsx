import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneCategoryByName } from "../../data/services/categoryService";

const Category = () => {
  const { name } = useParams();
  const [category, setCategory] = useState();

  useEffect(() => {
    getOneCategoryByName(name)
      .then((data) => {
        setCategory(data);
      })
      .catch((err) => console.log(err));
  }, [name]);

  return (
    <div>
      <h1>{name}</h1>
      <img src={category?.categoryImage} />
      <p>Hello there!</p>
    </div>
  );
};

export default Category;

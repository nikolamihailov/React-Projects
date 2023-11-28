import { useContext } from "react";
import { FavouriteProductsContext } from "../../contexts/FavouriteProductsContext";

const FavouriteProducts = () => {
  const { favProducts } = useContext(FavouriteProductsContext);
  return (
    <section>
      <h1>Favourite Products</h1>
      <div>{console.log(favProducts)}</div>
    </section>
  );
};

export default FavouriteProducts;

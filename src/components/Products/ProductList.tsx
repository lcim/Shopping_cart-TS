import UseProductHook from "../Hooks/UseProductHook";
import UseCartHook from "../Hooks/UseCartHook";
import { ReactElement } from "react";
import Product from "./Product";
import "./_products.scss";

const ProductList = () => {
  const { dispatch, REDUCER_ACTION_MEMOISED, cart } = UseCartHook();
  const { products } = UseProductHook();

  let pageDisplay: ReactElement | ReactElement[] = <p>loading...</p>;

  if(products?.length > 0) {
    pageDisplay = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);
      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTION_MEMOISED={REDUCER_ACTION_MEMOISED}
          inCart={inCart}
        />
      );
    });
  }
  const content = <main className="main__products">{pageDisplay}</main>;

  return content;
};

export default ProductList;

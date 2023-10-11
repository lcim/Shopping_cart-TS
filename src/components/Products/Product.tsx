import React, { ReactElement } from "react";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";
import { ProductType } from "../context/ProductsProvider";
import "./_products.scss";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTION_MEMOISED: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTION_MEMOISED,
  inCart,
}: PropsType): ReactElement => {
  //
  const img: string = new URL(
    `../../assets/images/${product.sku}.png`,
    import.meta.url
  ).href;

  const addToCart = () =>
    dispatch({
      type: REDUCER_ACTION_MEMOISED.ADD,
      payload: { ...product, qty: 1 },
    });

  const itemInCart = inCart ? " ✔️Item added to Cart" : null;
  // ₦
  const content = (
    <section className="product">
      <h3 className="product__name">{product.name}</h3>
      <div className="product__image__container">
        <img src={img} alt={product.name} className="product__image" />
      </div>
      <div className="description">
        <p className="product__price">
          <span>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "NGN",
            }).format(product.price)}
          </span>
          &nbsp;
          {itemInCart}
        </p>
        <button className="btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </section>
  );

  return content;
};

export default Product;

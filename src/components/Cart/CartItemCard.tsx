import React, { ChangeEvent, ReactElement } from "react";
import "./_Cart.scss";
import {
  CartItemType,
  ReducerAction,
  ReducerActionType,
} from "../context/CartProvider";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTION_MEMOISED: ReducerActionType;
};
const CartItemCard = ({
  item,
  REDUCER_ACTION_MEMOISED,
  dispatch,
}: PropsType) => {
  const img: string = new URL(
    `../../assets/images/${item.sku}.png`,
    import.meta.url
  ).href;

  // console.log(typeof item.qty);

  const subtotal: number = item.qty * item.price;

  const highestQty: number = 20 > item.qty ? 20 : item.qty;

  const optionElementValues: number[] = [...Array(highestQty).keys()].map(
    (val) => val + 1
  );

  const options: ReactElement[] = optionElementValues.map((value) => {
    return (
      <option key={`opt${value}`} value={value}>
        {value}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTION_MEMOISED.CHANGE_QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    }); console.log(e.target.value)
  };

  const onRemoveFromCart = () => {
    dispatch({ type: REDUCER_ACTION_MEMOISED.REMOVE, payload: item });
  };

  const content = (
    <li className="cart__item">
      <div className="cart__item__image__wrapper">
        <img src={img} alt={item.name} className="item__image" />
        <div aria-label="Item Name">{item.name}</div>
      </div>
      <div className="cart__descriptions">
        <div aria-label="Item Unit Price">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(item.price)}
        </div>
        <div className="item__quantity">
          <label htmlFor="ItemQty" className="offscreen">
            Quantity:
          </label> &nbsp;
          <select
            name="ItemQty"
            id="ItemQty"
            className="manually__select__qty"
            value={item.qty}
            aria-label="Item Quantity"
            onChange={onChangeQty}
          >
            {options}
          </select>
        </div>
        <div className="cart__item__subtotal" aria-label="Line Item subtotal">
          <span className="sub__totals">subtotal: &nbsp;</span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(subtotal)}
        </div>
        <button
          className="remove__item__from__cart"
          aria-label="Remove Item from cart"
          title="Remove Item from cart"
          onClick={onRemoveFromCart}
        >
          X
        </button>
      </div>
    </li>
  );
  return content;
};

export default CartItemCard;

import { useState } from "react";
import UseCartHook from "../Hooks/UseCartHook";
import CartItemCard from "./CartItemCard";
import './_Cart.scss'

const Cart = () => {
  const [checkedout, setCheckedout] = useState(false);
  const {
    dispatch,
    totalItems,
    totalPrice,
    REDUCER_ACTION_MEMOISED,
    cart,
  } = UseCartHook();
   
  // console.log(cart)
  
  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTION_MEMOISED.SUBMIT });
    setCheckedout(true);
  };
   
  const pageDisplay = checkedout ? (
    <h1 className="after__submit">Thanks for testing out our app 👏👏👏</h1>
  ) : 
    <>
      {/* <h2 className="offscreen"></h2> */}
      <ul className="cart">
        {cart.map((item) => (
          <CartItemCard
            key={item.sku}
            item={item}
            dispatch={dispatch}
            REDUCER_ACTION_MEMOISED={REDUCER_ACTION_MEMOISED}
          />
        ))}
      </ul>
      {cart.length > 0
      ?  < div className="cart__summary">
        <p>TotalItems: {totalItems}</p>
        <p className="grand__price">TotalPrice: {totalPrice}</p>
        <button
          className="checkout"
          disabled={totalItems < 1}
          onClick={onSubmitOrder}
        >
          Check out?
        </button>
        </div>
        :<h3 className="empty__cart">Your Cart is empty!</h3>
        }
    </>
  const content = (<main className="main__cart">{pageDisplay}</main>);
  
  return content;
};

export default Cart;

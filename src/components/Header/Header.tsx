import UseCartHook from "../Hooks/UseCartHook";
import UseProductHook from "../Hooks/UseProductHook";
import "./_Header.scss";
import React from "react";

type viewShopType = {
  viewShop: boolean;
  setViewShop: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header = ({
  viewShop,
  setViewShop,
}: // totalItems,
// totalPrice,
viewShopType) => {
  const { totalItems, totalPrice } = UseCartHook();
  return (
    <nav className="header__container">
      <h1 className="title">Chiadi Farms</h1>
      <div className="shopping__summary">
        <p className="total__items">Total Items: {totalItems}</p>
        <p className="total__price">Total Price: { totalItems > 0 && totalPrice}</p>
        <button onClick={() => setViewShop(!viewShop)} className="toggle__cart">
          {viewShop ? "View Cart" : "Shop more?"}
        </button>
      </div>
    </nav>
  );
};

export default Header;

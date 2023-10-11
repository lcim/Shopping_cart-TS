import Cart from "../Cart/Cart";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ProductList from "../Products/ProductList";
import "./style.scss";
import { useState } from "react";

function App() {
  const [viewShop, setViewShop] = useState<boolean>(true);

  const displayPage = viewShop ? <ProductList /> : <Cart />;

  const content = (
    <div className="app">
      <Header viewShop={viewShop} setViewShop={setViewShop} />
      {displayPage}
      <Footer viewShop={viewShop} />
    </div>
  );

  return content;
}

export default App;

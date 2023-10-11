import UseCartHook from "../Hooks/UseCartHook";
import './_Footer.scss';

type viewShopType = {
  viewShop: boolean;
};
const Footer = ({ viewShop }: viewShopType) => {
  const { totalPrice, totalItems } = UseCartHook();
  const year: number = new Date().getFullYear();
  const pageDisplay = viewShop ? (
     <div className="footer">
      <p>Total Items: {totalItems} </p>
      <p>Total Price: <span>{ totalItems > 0 && totalPrice}</span> </p>
      <p>Chiadi Farms &copy; {year}</p> </div>
  ) : (
    <p>Chiadi Farms &copy; {year}</p>
  )
   ;
  const content = <footer className="footer__container">{pageDisplay}</footer>;
  return content;
};

export default Footer;

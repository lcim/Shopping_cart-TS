import { ReactElement, createContext, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

const initState: ProductType[] = [
  { sku: "item0001", price: 3999, name: "full chicken" },
  { sku: "item0002", price: 2999, name: "crate of egg" },
  { sku: "item0003", price: 3499, name: "old layer" },
  { sku: "item0004", price: 100, name: "maize" },
];

export type ProductsContextType = {
  products: ProductType[];
};

const initContextState: ProductsContextType = {
  products: [],
};

const ProductsContext = createContext<ProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;

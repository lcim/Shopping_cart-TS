import { ReactElement, createContext, useMemo, useReducer } from "react";

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

export type CartStateType = { cart: CartItemType[] };

const initCartState: CartStateType = { cart: [] };
// Because CartStateType is an object, we use reducer

enum REDUCER_ACTION_TYPE {
  ADD,
  REMOVE,
  CHANGE_QUANTITY,
  SUBMIT,
}

// const REDUCER_ACTION_TYPE= {
//   ADD: "ADD",
//   REMOVE: "REMOVE",
//   CHANGE_QUANTITY: "CHANGE_quANTITY",
//   SUBMIT: "SUBMIT",
// }

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      // ensure payload exists
      if (!action.payload) {
        throw new Error("action.payload not found in reducer action ADD");
      }
      // destructure sku, name, & price from action.payload
      const { sku, name, price } = action.payload;
      // verify that the selected item exists or not in cart
      const targetedItemExists: CartItemType | undefined = state.cart.find(
        (item) => sku === item.sku
      );
      // Adjust its QUANTITY accordingly
      const newQty: number = targetedItemExists
        ? targetedItemExists.qty + 1
        : 1;
      // filter out from cart, items other than the selected item
      const otherItems: CartItemType[] = state.cart.filter(
        (cartItem) => sku !== cartItem.sku
      );
      // return the new cart state
      return {
        ...state,
        cart: [...otherItems, { sku, name, price, qty: newQty }],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload not found in reducer action ADD");
      }
      const { sku } = action.payload;
      // filter out from cart, items other than the selected item
      const otherItems: CartItemType[] = state.cart.filter(
        (cartItem) => sku !== cartItem.sku
      );
      // return the new cart state
      return { ...state, cart: [...otherItems] };
    }
    case REDUCER_ACTION_TYPE.CHANGE_QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload not found in reducer action ADD");
      }
      const { sku, qty } = action.payload;
      const targetedItemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      if (!targetedItemExists) {
        throw new Error("You cannot updated undefined item");
      }
      const updatedItem: CartItemType = { ...targetedItemExists, qty };
      const otherItems: CartItemType[] = state.cart.filter(
        (cartItem) => cartItem.sku !== sku
      );
      
      return { ...state, cart: [...otherItems, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT:
      return { ...state, cart: [] };
    default:
      throw new Error("Unknown reducer action.type");
  }
};

const UseCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTION_MEMOISED = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems = state.cart.reduce((prevValue, cartItem) => {
    return prevValue + cartItem.qty;
  }, 0);

  const rawPrice = state.cart.reduce((prevValue, cartItem) => {
    return prevValue + cartItem.price * cartItem.qty;
  }, 0);
  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(rawPrice);

  const cart = state.cart.sort((a, b) => {
    const item1 = Number(a.sku.slice(-4));
    const item2 = Number(b.sku.slice(-4));
    return item1 - item2;
  });

  return {
    REDUCER_ACTION_MEMOISED,
    dispatch,
    cart,
    totalItems,
    totalPrice,
  };
};

export type UseCartContextType = ReturnType<typeof UseCartContext>;

const initCartContextState: UseCartContextType = {
  REDUCER_ACTION_MEMOISED: REDUCER_ACTION_TYPE,
  dispatch: () => {},
  cart: [],
  totalItems: 0,
  totalPrice: "",
};

const CartContext = createContext<UseCartContextType>(initCartContextState)

type ChildrenType = {
  children?: ReactElement | ReactElement[]
}

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return <CartContext.Provider value={UseCartContext(initCartState)} >
    {children}
  </CartContext.Provider>
}

export default CartContext;
import { useContext } from "react"
import CartContext, { UseCartContextType } from "../context/CartProvider"

const UseCartHook = (): UseCartContextType => {
  return useContext(CartContext)
}

export default UseCartHook
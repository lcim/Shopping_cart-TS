import { useContext } from 'react'
import ProductsContext, { ProductsContextType } from '../context/ProductsProvider'

const UseProductHook = () : ProductsContextType => {
  return useContext(ProductsContext)
}

export default UseProductHook
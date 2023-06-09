import React, { useContext, createContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const context = createContext();


const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const incQty = ()=>{
        setQty((prevQty)=> prevQty + 1)
    }
    const decQty = ()=>{
        setQty((prevQty)=> {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        })
    }
    const onAdd = (product, quantity)=>{
        const checkProductinCart = cartItems.find((item) => item._id === product._id)
        console.log(checkProductinCart, cartItems)
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)
        if(checkProductinCart) {
            const updatedCartItems = (cartItems.map((cartProduct)=>{
                if (cartProduct._id === product._id) return {
                    ...cartProduct, quantity: cartProduct.quantity + quantity
                }
            }))
            setCartItems(updatedCartItems)
        }
        else{
            product.quantity = quantity
            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart.`)
    }
    const onRemove = (id)=>{
        foundProduct = cartItems.find((item)=>item._id === id)
        const newCartItems = cartItems.filter((item)=>item._id !== id)
        setTotalPrice((prevTotalPrice)=> prevTotalPrice - (foundProduct.price * foundProduct.quantity))
        setTotalQuantities(prevTotalQuantities=> prevTotalQuantities- foundProduct.quantity)
        setCartItems(newCartItems)
    }
    const toggleCartItemQuantity = (id, value)=>{
        foundProduct = cartItems.find((item)=>item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        const newCartItems = cartItems.filter((item)=>item._id !== id)

        if(value === 'inc'){
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities=>prevTotalQuantities+1)
        }else if(value === 'dec'){
            if (foundProduct.quantity > 1){
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}])
                setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities=>prevTotalQuantities - 1)
            }
        }
    }
  return (
    <context.Provider value={{showCart,setShowCart, cartItems, totalPrice, totalQuantities, qty, incQty, decQty, onAdd, toggleCartItemQuantity, onRemove, setCartItems, setTotalPrice, setTotalQuantities}}>
        {children}
    </context.Provider>
  )
}

export const useStateContext = ()=> useContext(context)

export default StateContext
import { createContext, useContext, useState } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, name: "Tire A", price: 2500, stock: 10 },
    { id: 2, name: "Tire B", price: 3200, stock: 8 },
    { id: 3, name: "Tire C", price: 1800, stock: 15 },
  ]);

  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  // Add to cart
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // Checkout → move cart to history
  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const transaction = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      total,
    };
    setHistory((prev) => [...prev, transaction]);
    setCart([]);
  };

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, cart, setCart, addToCart, checkout, history }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}

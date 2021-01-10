import React, { useState, useEffect } from "react";

import { commerce } from "./lib/commerce";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // fetching products
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  // fetching cart
  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(cart);
  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      <Products products={products} onAddtoCart={handleAddToCart} />
    </div>
  );
};

export default App;

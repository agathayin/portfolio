"use client";
import { useState, useEffect } from "react";
import { CartItem, ProductItem } from "./interface";
import "./style.scss";
import data from "@/app/product-list-with-cart/data.json";
import _ from "lodash";
import Cart from "./components/Cart";
import OrderModal from "./components/OrderModal";
import Products from "./components/Products";

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  useEffect(() => {
    if (data && data.length) {
      setProducts(data);
    }
    let localCart = localStorage.getItem("myCart");
    if (localCart) {
      let newCart: CartItem[] = JSON.parse(localCart);
      setCart(newCart);
      // sync products
      let newProducts: ProductItem[] = [...data];
      for (let product of newProducts) {
        product.addedQty = 0;
        let cart = newCart.find((el) => el.name === product.name);
        if (cart && cart.qty) {
          product.addedQty = cart.qty;
        }
      }
      setProducts(newProducts);
    }
  }, []);

  const onAddProduct = (product: ProductItem | CartItem, qty: number) => {
    console.log("onChange", product, qty);
    if (!product || !product.name || !qty) return;
    // sync cart
    let newCart = [...cart];
    let index = newCart.findIndex((el) => el.name === product.name);
    if (index > -1) {
      newCart[index].qty += qty;
    } else if (qty > 0) {
      let thumbnail = _.get(product, "image.thumbnail", "");
      newCart.push({
        name: product.name,
        price: product.price,
        qty: qty,
        thumbnail: thumbnail,
      });
    }
    newCart = newCart.filter((el) => el.qty && el.qty > 0);
    setCart(newCart);
    // save cart in localStorage
    localStorage.setItem("myCart", JSON.stringify(newCart));
    // sync products
    let newProducts = [...products];
    let pIndex = newProducts.findIndex((el) => el.name === product.name);
    if (pIndex > -1) {
      if (!newProducts[pIndex].addedQty) newProducts[pIndex].addedQty = 0;
      newProducts[pIndex].addedQty += qty;
      setProducts(newProducts);
    }
  };
  const startNewOrder = () => {
    // hide modal
    setIsConfirmed(false);
    // clear cart
    setCart([]);
    localStorage.removeItem("myCart");
    // clear products
    let newData = [...products];
    newData.forEach((el) => (el.addedQty = 0));
    setProducts(newData);
  };
  return (
    <main className="m-5">
      <div className="flex flex-wrap justify-between">
        <Products products={products} onChange={onAddProduct} />
        <Cart cart={cart} onChange={onAddProduct} onSubmit={() => setIsConfirmed(true)} />
        <OrderModal cart={cart} isShown={isConfirmed} onSubmit={startNewOrder} />
      </div>
      <div></div>
    </main>
  );
}

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CartItem, RemoveProductFn } from "../interface";
import _ from "lodash";

export default function Cart({
  cart,
  onChange,
  onSubmit,
}: {
  cart: CartItem[];
  onChange: RemoveProductFn;
  onSubmit: () => void;
}) {
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let newQty = _.sumBy(cart, "qty");
    setTotalQty(newQty);
    let newPrice = _.round(
      _.sumBy(cart, (el) => el.qty * el.price),
      2
    );
    setTotalPrice(newPrice);
  }, [cart]);

  function roundCurrency(num: number = 0, precision: number = 2) {
    let integer = Math.floor(num);
    let decimal = Math.round((num - integer) * Math.pow(10, precision));
    let decimalStr = (String(decimal) + "0000000000").substring(0, precision);
    let str = "$" + String(integer) + "." + decimalStr;
    return str;
  }

  return (
    <div id="cart" className="bg-white p-5 rounded w-full lg:w-3/12">
      <div className="text-c-red text-base font-bold">Your cart ({totalQty})</div>
      {totalQty ? (
        <div>
          <div id="cartList" className="grid ">
            {cart.map((el, i) => {
              return (
                <div
                  className="cartItem flex flex-nowrap justify-between align-baseline pb-3 mb-3 border-b text-sm"
                  key={`cartItem_${i}`}
                >
                  <div className="grow">
                    <div className="name">{el.name}</div>
                    <div>
                      <span className="qty">{el.qty}x</span>
                      <span className="unitPrice">@{roundCurrency(el.price)}</span>
                      <span className="totalPrice">{roundCurrency(_.round(el.price * el.qty, 2))}</span>
                    </div>
                  </div>

                  <Image
                    className="removeIcon align-middle"
                    src="/product-list-with-cart/images/icon-remove-item.svg"
                    alt="remove item"
                    height={20}
                    width={20}
                    onClick={() => onChange(el, 0 - el.qty)}
                  />
                </div>
              );
            })}
          </div>
          <div id="total" className="flex align-baseline">
            <div className="text-sm grow">Order Total</div>
            <div className="text-lg font-bold">{roundCurrency(totalPrice)}</div>
            <div></div>
          </div>
          <div id="carbonNeutral">
            <Image
              src="/product-list-with-cart/images/icon-carbon-neutral.svg"
              height={20}
              width={20}
              alt="carbon neutral"
              className="inline me-3"
            />
            <span>
              This is a <b>carbon-neutral</b> delivery
            </span>
          </div>
          <div>
            <button id="confirmOrderBtn" onClick={onSubmit}>
              Confirm Order
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <Image
            src="/product-list-with-cart/images/illustration-empty-cart.svg"
            alt="emptyCart"
            width={128}
            height={128}
            className="m-auto"
          />
          <div>Your added items will appear here</div>
        </div>
      )}
    </div>
  );
}

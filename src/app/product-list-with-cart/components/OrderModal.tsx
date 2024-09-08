"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CartItem } from "../interface";
import _ from "lodash";
import roundCurrency from "./roundCurrency";

export default function OrderModal({
  cart,
  onSubmit,
  isShown,
}: {
  cart: CartItem[];
  onSubmit: () => void;
  isShown: boolean;
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

  return isShown ? (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="orderModal">
      <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center w-full md:items-center">
          <div className="modalContent relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-h-full md:w-11/12 lg:max-w-screen-sm">
            <div className="modalBody bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div>
                <div className="mb-3">
                  <Image
                    src="/product-list-with-cart/images/icon-order-confirmed.svg"
                    width={42}
                    height={48}
                    alt="order confirmed icon"
                  />
                </div>
                <div className="text-4xl font-bold max-w-0.5 md:max-w-full">Order Confirmed</div>
                <div className="text-base text-c-bean mb-5">We hope you enjoy your food!</div>
                <div id="orderList" className="grid">
                  {cart.map((el, i) => {
                    return (
                      <div
                        className="cartItem flex flex-nowrap justify-between align-baseline pb-3 mb-3 border-b text-sm"
                        key={`cartItem_${i}`}
                      >
                        <div className="me-3">
                          <Image src={el.thumbnail} alt={"tn_" + el.name} width={48} height={48} />
                        </div>
                        <div className="grow">
                          <div className="name">{el.name}</div>
                          <div>
                            <span className="qty">{el.qty}x</span>
                            <span className="unitPrice">@{roundCurrency(el.price)}</span>
                          </div>
                        </div>
                        <div className="text-c-dark">{roundCurrency(_.round(el.price * el.qty, 2))}</div>
                      </div>
                    );
                  })}
                  <div id="total" className="flex align-baseline mt-3 text-c-dark">
                    <div className="text-sm grow">Order Total</div>
                    <div className="text-lg font-bold">{roundCurrency(totalPrice)}</div>
                  </div>
                </div>

                <div>
                  <button id="startNewOrderBtn" onClick={onSubmit}>
                    Start New Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

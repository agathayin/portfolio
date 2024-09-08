"use client";
import Image from "next/image";
import { ProductItem, AddProductFn } from "../interface";
import _ from "lodash";

export function ProductCard({ product, onChange }: { product: ProductItem; onChange: AddProductFn }) {
  return (
    <div className="product text-base">
      <div className={`productCard`}>
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 768px)" srcSet={product.image.tablet} />
          <source media="(min-width: 10px)" src={product.image.mobile} />
          <img
            src={`${product.image.mobile}`}
            alt={product.name}
            className={`productImg ${product.addedQty ? "added" : ""}`}
          />
        </picture>
        <div className="buttons">
          {product.addedQty ? (
            <button className="addToCard added">
              <Image
                src="/product-list-with-cart/images/icon-decrement-quantity.svg"
                alt="decrement quantity"
                width={16}
                height={16}
                className="qtyBtnDecrease"
                onClick={() => onChange(product, -1)}
              />
              <span className="grow text-center">{product.addedQty}</span>
              <Image
                src="/product-list-with-cart/images/icon-increment-quantity.svg"
                alt="increment quantity"
                width={16}
                height={16}
                className="qtyBtnIncrease"
                onClick={() => onChange(product, 1)}
              />
            </button>
          ) : (
            <button className="addToCard" onClick={() => onChange(product, 1)}>
              <Image
                src="/product-list-with-cart/images/icon-add-to-cart.svg"
                width={20}
                height={20}
                alt="add to cart icon"
              />
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <div className="productInfo mb-3">
        <div className="category text-sm">{product.category}</div>
        <div className="name font-semibold">{product.name}</div>
        <div className="price">${product.price}</div>
      </div>
    </div>
  );
}
export default function Products({ products, onChange }: { products: ProductItem[]; onChange: AddProductFn }) {
  let productList = products.map((el, i) => {
    return <ProductCard product={el} key={i} onChange={onChange} />;
  });
  return (
    <div className="w-full lg:w-9/12">
      <div className="text-5xl font-bold mb-5">Desserts</div>
      <div id="productsList" className="w-full grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-3 ">
        {productList}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getProducts } from "../api";
import FontAwesome from "react-fontawesome";
import defaultImage from "../images/product-1.jpg";
import { isLoggedIn } from "../utils";

export function loader() {
  return defer({ products: getProducts() });
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dataPromise = useLoaderData();
  const [displayedProductsCount, setDisplayedProductsCount] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const categoryFilter = searchParams.get("category");
  const priceFilter = searchParams.get("price");
  const ratingFilter = searchParams.get("rating");

  useEffect(() => {
    setDisplayedProductsCount(dataPromise.products.length);
  }, [dataPromise.products]);

  useEffect(() => {
    const filters = [];
    if (categoryFilter)
      filters.push({ key: "category", value: categoryFilter });
    if (priceFilter) filters.push({ key: "price", value: priceFilter });
    if (ratingFilter) filters.push({ key: "rating", value: ratingFilter });
    setSelectedFilters(filters);
  }, [categoryFilter, priceFilter, ratingFilter]);

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  function handleCartClick() {
    const request = new Request(window.location.href);
    const pathname = new URL(request.url).pathname;
    const response = isLoggedIn();
    console.log(response);
    if (!response) {
      window.location.href = `/login?message=You must log in first.&redirectTo=${pathname}`;
    }
  }

  function clearFilter(key) {
    setSearchParams((prevParams) => {
      prevParams.delete(key);
      return prevParams;
    });
  }

  function renderProductsElements(products) {
    // Filter products based on selected category, price, and rating
    let displayedProducts = [...products]; // Initialize with all products

    if (categoryFilter) {
      displayedProducts = displayedProducts.filter(
        (product) => product.category === categoryFilter
      );
    }
    if (priceFilter) {
      displayedProducts = displayedProducts.filter(
        (product) => product.price === priceFilter
      );
    }
    if (ratingFilter) {
      displayedProducts = displayedProducts.filter(
        (product) => product.rating >= parseInt(ratingFilter)
      );
    }
    setDisplayedProductsCount(displayedProducts.length);
    const productsElements = displayedProducts.map((product) => {
      const parts = defaultImage.split("-");
      parts[parts.length - 1] = `${product.id}.jpg`;
      const imageUrl = parts.join("-");

      return (
        <div key={product.id} className="p-2 relative flex flex-col  border rounded-md overflow-hidden bg-white m-2 shadow-xl  transition duration-200 ease-in-out transform hover:shadow-green hover:scale-105">
          <Link
            to={`${product.id}`}
            state={{
              search: `?${searchParams.toString()}`,
              category: categoryFilter,
              price: priceFilter,
              rating: ratingFilter,
            }}
          >
            

            <div className="relative">
            <div className="absolute top-3 left-3  ">
              {product.stockAmount === 0 && (
                <div className="rounded bg-customGrey text-center text-white px-3 py-2 text-xs font-normal">
                  Out of stock
                </div>
              )}
              {product.saleAmount > 0 && (
                <div className="rounded bg-customRed text-center text-white px-3 py-2 text-xs font-normal">
                  Sale {product.saleAmount}%
                </div>
              )}
            </div>
              {/* Product image */}
              <img src={imageUrl} alt={product.name} className="h-64" />
              {/* Dark overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition rounded-sm duration-300 ease-in-out bg-black bg-opacity-50">
                {/* View Product text */}
                <p className="text-white font-bold text-lg opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                  View Product
                </p>
              </div>
            </div>
            <div className="p-4">
              <p className="  text-xs font-normal text-customFontColor">
                {product.name}
              </p>
              {product.saleAmount ? (
              <div className="flex gap-2 items-center">
                <h3 className="text-gray-500 line-through">${product.price}</h3>
                <h3 className="font-semibold my-1 text-gray-700 text-base">
                  {product.price * product.saleAmount / 100} EGP
                </h3>
              </div>
            ) : (
              <>
                <h3 className="font-semibold my-1 text-gray-700 text-base">
                {product.price} EGP
                </h3>
              </>
            )}
            
                <div className="flex items-center">
                  {[...Array(product.rating)].map((_, index) => (
                    <FontAwesome
                      key={index}
                      name="fa-regular fa-star"
                      className="text-yellow-500 mr-1 text-xs"
                    />
                  ))}
                </div>
            </div>
          </Link>
          <FontAwesome
            onClick={() => handleCartClick()}
            className="text-black text-xl cursor-pointer absolute right-3 bottom-4 bg-white rounded-full shadow-md w-10 h-10 transition duration-300 ease-in-out transform hover:bg-black hover:scale-110 hover:text-customGreen flex items-center justify-center cart-icon"
            name="fa-solid fa-cart-plus"
          />
        </div>
      );
    });

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productsElements}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Explore our products</h1>

      <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
          <div className="relative">
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select category</option>
              <option value="Gardening Tools">Gardening Tools</option>
              <option value="Soil Enhancers">Soil Enhancers</option>
            </select>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
          <div className="relative">
            <select
              id="rating"
              value={ratingFilter}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
              className="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select rating</option>
              <option value="1">★</option>
              <option value="2">★★</option>
              <option value="3">★★★</option>
              <option value="4">★★★★</option>
              <option value="5">★★★★★</option>
            </select>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4 flex items-center gap-10">
          {selectedFilters.map((filter, index) => (
            <div
              key={index}
              className="selected-filter bg-gray-200 rounded-md p-2  min-w-max"
            >
              {filter.key === "rating" ? (
                <>
                  <span className="mr-2">Rating:</span>
                  {[...Array(parseInt(filter.value))].map((_, i) => (
                    <FontAwesome
                      key={i}
                      name="fa-regular fa-star"
                      className="text-yellow-500"
                    />
                  ))}
                  <button
                    className="clear-filter ml-4 font-semibold focus:outline-none"
                    onClick={() => clearFilter(filter.key)}
                  >
                    x
                  </button>
                </>
              ) : (
                <>
                  <span className="mr-2 ">{filter.value}</span>
                  <button
                    className="clear-filter ml-4 font-semibold focus:outline-none"
                    onClick={() => clearFilter(filter.key)}
                  >
                    x
                  </button>
                </>
              )}
            </div>
          ))}
          <div className="results-founded w-fit flex gap-3 min-w-max text-gray-700 ">
            {displayedProductsCount}
            <h2>Results found</h2>
          </div>
        </div>
      </div>
      <div>
        <React.Suspense fallback={<h2>Loading products...</h2>}>
          <Await resolve={dataPromise.products}>{renderProductsElements}</Await>
        </React.Suspense>
      </div>
    </div>
  );
}

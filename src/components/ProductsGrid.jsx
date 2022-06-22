import axios from "axios";
import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

const ProductsGrid = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const CardSkeleton = () => {
    return (
      <div className="placeholder-wave ">
        <span
          className="placeholder m-2"
          style={{ minWidth: 300, height: 400 }}
        ></span>
      </div>
    );
  };
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setProductList(data);
      setFilteredProduct(data);
      setIsLoading(false);
    } catch (e) {
      alert(e);
    }
  };

  const handleCategoryFilter = (category) => {
    setFilteredProduct(
      productList.filter((product) => product.category === category)
    );
  };

  const handlePriceFilter = (price) => {
    setFilteredProduct(
      productList.filter((product) => product.category === price)
    );
  };

  const handleRatingFilter = (rating) => {
    setFilteredProduct(
      productList.filter((product) => product.rating.rate >= rating)
    );
  };

  const handlePriceSort = () => {
    const sortedFilteredProduct = [...filteredProduct].sort((a, b) => {
      return a.price - b.price;
    });
    setFilteredProduct(sortedFilteredProduct);
  };

  const handleRatingSort = () => {
    const sortedFilteredProduct = [...filteredProduct].sort((a, b) => {
      return a.rating?.rate - b.rating?.rate;
    });
    setFilteredProduct(sortedFilteredProduct);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container d-flex flex-column flex-sm-row px-4">
        <div className="d-flex justify-content-center flex-wrap gap-2 mt-2">
          <button
            type="button"
            onClick={() => setFilteredProduct(productList)}
            className="btn btn-sm btn-info"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => handleCategoryFilter("men's clothing")}
            className="btn btn-sm btn-info"
          >
            Men's Clothing
          </button>
          <button
            type="button"
            onClick={() => handleCategoryFilter("women's clothing")}
            className="btn btn-sm btn-info"
          >
            Women's Clothing
          </button>
          <button
            type="button"
            onClick={() => handleCategoryFilter("jewelery")}
            className="btn btn-sm btn-info"
          >
            Jewelery
          </button>
          <button
            type="button"
            onClick={() => handleCategoryFilter("electronics")}
            className="btn btn-sm btn-info"
          >
            Electronics
          </button>
        </div>

        <button
          className="btn btn-sm btn-info ms-auto dropdown-toggle mt-2 "
          style={{ height: "max-content", width: "max-content" }}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                handlePriceSort();
              }}
            >
              By price
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                handleRatingSort();
              }}
            >
              By rating
            </button>
          </li>
        </ul>
      </div>
      <br />
      <div className="container d-flex flex-wrap justify-content-evenly">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          filteredProduct.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        )}
      </div>
    </>
  );
};

export default ProductsGrid;

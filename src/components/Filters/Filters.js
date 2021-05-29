import React, { useEffect, useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";

const Filters = () => {
  let [ascending, setAscending] = useState(false);
  let [descending, setDescending] = useState(false);
  let { productListDispatch, setClearFilter } = useProductList();

  const handlePriceChange = (event) => {
    if (event.target.value === "Ascending") {
      setAscending(true);
      setDescending(false);
      productListDispatch({
        type: "PRODUCT_LIST_ASCENDING",
      });
    } else if (event.target.value === "Descending") {
      setDescending(true);
      setAscending(false);
      productListDispatch({
        type: "PRODUCT_LIST_DESCENDING",
      });
    }
  };

  const clearFilter = () => {
    setClearFilter(true);
    setAscending(false);
    setDescending(false);
  };

  return (
    <div>
      <h2>Filters</h2>
      <div>
        <p>Based on Price</p>
        <form>
          <input
            type="radio"
            id="asc"
            value="Ascending"
            name="price"
            checked={ascending}
            onChange={(e) => handlePriceChange(e)}
          />
          <label htmlFor="asc">Low To High</label>
          <input
            type="radio"
            id="desc"
            value="Descending"
            name="price"
            checked={descending}
            onChange={(e) => handlePriceChange(e)}
          />
          <label htmlFor="desc">High To Low</label>
        </form>
        <button className="btn" onClick={() => clearFilter()}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export { Filters };

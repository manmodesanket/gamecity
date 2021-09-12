import React, { useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";

const Filters = () => {
  let [ascending, setAscending] = useState(false);
  let [descending, setDescending] = useState(false);
  let {
    productListDispatch,
    setClearFilter,
    includeOutOfStock,
    setIncludeOutOfStock,
  } = useProductList();

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
    <section>
      <div>
        <h3>Sort By</h3>
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
        <h3>Filter by</h3>
        <form>
          <input
            type="checkbox"
            id="stock"
            value="Out of Stock"
            name="Out of Stock"
            checked={includeOutOfStock}
            onChange={() => setIncludeOutOfStock(!includeOutOfStock)}
          />
          <label htmlFor="asc">Include Out Of Stock</label>
        </form>

        <button className="btn btn__filter" onClick={() => clearFilter()}>
          Clear Filters
        </button>
      </div>
    </section>
  );
};

export { Filters };

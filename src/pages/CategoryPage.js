import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import BASE_URL from "../config";
import LoadingSpinner from "../components/LoadingSpinner";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { ourBestSellers, loading, error } = useProducts();
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, sortOption]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  let filteredProducts = [];

  if (categoryId === "bestseller") {
    filteredProducts = [...ourBestSellers];
  } else {
    const allSections = [...ourBestSellers];
    filteredProducts = allSections.filter((product) =>
      product.category_names?.some(
        (cat) =>
          cat.toLowerCase().replace(/\s+/g, "-") === categoryId.toLowerCase()
      )
    );
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "popularity":
        return b.sold_count - a.sold_count;
      case "rating":
        return b.rating - a.rating;
      case "latest":
        return new Date(b.created_at) - new Date(a.created_at);
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedProducts.slice(startIndex, endIndex);
  console.log("currentItems",currentItems)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
        startPage = totalPages - (maxVisiblePages - 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxVisiblePages / 2);
        endPage = currentPage + Math.floor(maxVisiblePages / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift(1);
      if (startPage > 2) pages.unshift("...");
    }
    if (endPage < totalPages) {
      pages.push(totalPages);
      if (endPage < totalPages - 1) pages.push("...");
    }

    return pages;
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end align-items-center p-3">
        <select
          className="form-select w-auto bg-dark border-success text-white"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="default">Default sorting</option>
          <option value="popularity">Sort by popularity</option>
          <option value="rating">Sort by average rating</option>
          <option value="latest">Sort by latest</option>
          <option value="price-low-high">Sort by price: low to high</option>
          <option value="price-high-low">Sort by price: high to low</option>
        </select>
      </div>

      {sortedProducts.length === 0 ? (
        <p className="text-white">No products found in this category.</p>
      ) : (
        <>
          <div className="row">
            {currentItems.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card bestseller-product h-100 bg-black text-white border-0 rounded-4 position-relative overflow-hidden">
                  <Link to={`/shop-details/${item.product_id}`}>
                    <img
                      src={
                        item.image && item.image.startsWith("http")
                          ? item.image
                          : item.image
                          ? `${BASE_URL}/uploads/${item.image}`
                          : "/default-product-image.png"
                      }
                      className="card-img-top bestseller-img"
                      alt={item.name || "Product image"}
                      style={{
                        height: "350px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </Link>
                  {item.discount && item.price && (
                    <div className="badge bg-danger position-absolute top-0 start-0 m-3">
                      -
                      {Math.round(
                        (item.discount / (item.price + item.discount)) * 100
                      )}
                      %
                    </div>
                  )}

                  <div className="card-body bg-dark">
                    <Link
                      to={`/shop-details/${item.id}`}
                      className="card-title category-card-name "
                    >
                      <h5 className="text-center">{item.name}</h5>
                    </Link>
                    <div className="text-center d-flex justify-content-center flex-wrap">
                      {item.category_names.map((category, index) => (
                        <span key={index} className="d-flex">
                          <Link
                            to={`/category/${category
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="text-decoration-none py-1 card-text"
                          >
                            {category}
                          </Link>
                          {index < item.category_names.length - 1 && (
                            <span>,&nbsp;</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center gap-2 my-4 flex-wrap">
              <button
                className="btn btn-outline-light"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i class="fa-solid fa-angle-left"></i> Prev
              </button>

              <div className="d-flex gap-1">
                {getPageNumbers().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === "..." ? (
                      <span className="text-white mx-1 d-flex align-items-center">
                        ...
                      </span>
                    ) : (
                      <button
                        className={`btn ${
                          currentPage === page
                            ? "btn-primary"
                            : "btn-outline-light"
                        }`}
                        onClick={() => handlePageChange(page)}
                        disabled={currentPage === page}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <button
                className="btn btn-outline-light"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;

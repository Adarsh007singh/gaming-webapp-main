import React, { useEffect, useState } from "react";
import "../css/ProductToastModal.css";
import { Link } from "react-router-dom";
import BASE_URL from "../config";

// ✅ Helpers for price & discount
const getFirstPrice = (product) => {
  if (product.final_rate) {
    try {
      const parsed = JSON.parse(product.final_rate);
      if (parsed.length > 0 && parsed[0].finalRate) {
        return Number(parsed[0].finalRate);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return product.price || 0;
};

const getFirstDiscount = (product) => {
  if (product.discount_amount) {
    try {
      const parsed = JSON.parse(product.discount_amount);
      if (parsed.length > 0 && parsed[0].discountAmount) {
        return Number(parsed[0].discountAmount);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return 0;
};

const ProductToastModal = ({ product, onClose, saggestedProduct }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setVisible(true);
    }
  }, [product]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Wait for animation to finish
  };

  const scrollSuggested = (direction) => {
    const container = document.getElementById("suggested-products");
    const scrollAmount = 150; // Adjust based on item width
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  if (!product) return null;

  return (
    <>
      {/* Background fade overlay with animation */}
      <div
        className={`toast-overlay ${visible ? "fade-in" : "fade-out"}`}
        onClick={handleClose}
      ></div>

      {/* Modal slide in/out */}
      <div
        className={`product-toast-modal ${visible ? "slide-in" : "slide-out"}`}
      >
        <div className="shadow-lg h-100" style={{ backgroundColor: "#232F3E" }}>
          <div className="d-flex align-items-center justify-content-between text-white px-3 py-3 rounded-top">
            <div>
              <i className="fa-solid fa-cart-plus me-2"></i>
              <strong>Product successfully added to your cart!</strong>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
            ></button>
          </div>

          <div className="p-3">
            <div className="row">
              <div className="col-md-2">
                <Link to={`/shop-details/${product.product_id}`}>
                  <img
                    src={
                      product.image && product.image.startsWith("http")
                        ? product.image
                        : product.image
                        ? `${BASE_URL}/uploads/${product.image}`
                        : "/default-product-image.png"
                    }
                    alt={product.product_name}
                    className="img-fluid"
                    style={{ width: "100px", borderRadius: "6px" }}
                  />
                </Link>
              </div>
              <div className="ps-3 text-white col-md-9">
                <div className="d-flex justify-content-between align-items-center ">
                  <h6 className="mb-1">{product.product_name}</h6>
                  <p className="mb-0 text-end">
                    ₹{getFirstPrice(product).toFixed(2)}{" "}
                    {getFirstDiscount(product) > 0 && (
                      <del style={{ color: "#aaa", fontSize: "14px" }}>
                        ₹
                        {(
                          getFirstPrice(product) + getFirstDiscount(product)
                        ).toFixed(2)}
                      </del>
                    )}
                  </p>
                </div>
                <div className="toast-modal-border pb-3"></div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h6 className="mb-1">Shipping Cost:</h6>
                  <p className="mb-0 text-end">₹0.00</p>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <h6 className="mb-1">Cart Total:</h6>
                  <p className="mb-0 text-end">
                    ₹{getFirstPrice(product).toFixed(2)}
                  </p>

                  {/* 🔥 TODO: Replace hardcoded value with actual cart total */}
                </div>
              </div>
            </div>
            <div className=" toast-modal-border pt-4"></div>
            <div className="d-flex justify-content-between mt-4 pb-3">
              <Link to="/cart" className="btn w-50 me-2 toast-view-btn">
                <i className="fas fa-shopping-cart me-2"></i> View Cart
              </Link>
              <Link
                to="/category/bestseller"
                className="btn btn-outline-secondary w-50 toast-shopping-btn"
              >
                Continue Shopping
              </Link>
            </div>
            <div className=" toast-modal-border pt-3"></div>
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="text-white mb-0">SUGGESTED PRODUCTS</h6>
                <div>
                  <button
                    className="btn btn-sm  me-1"
                    style={{ border: "1px solid #006CB5" }}
                    onClick={() => scrollSuggested(-1)}
                  >
                    <i className="fa-solid fa-angle-left text-white"></i>
                  </button>
                  <button
                    className="btn btn-sm "
                    style={{ border: "1px solid #006CB5" }}
                    onClick={() => scrollSuggested(1)}
                  >
                    <i className="fa-solid fa-angle-right text-white"></i>
                  </button>
                </div>
              </div>

              <div className="suggested-products-wrapper mb-5">
                <div
                  className="suggested-products d-flex justify-content-between "
                  id="suggested-products"
                >
                  {saggestedProduct.map((item) => (
                    <div
                      className="suggested-product-item"
                      key={item.product_id}
                    >
                      <Link to={`/shop-details/${item.product_id}`}>
                        <img
                          src={
                            item.image && item.image.startsWith("http")
                              ? item.image
                              : item.image
                              ? `${BASE_URL}/uploads/${item.image}`
                              : "/default-product-image.png"
                          }
                          alt={item.product_name || "Product Image"}
                          className="me-2"
                        />
                      </Link>
                      <div>
                        <p className="mb-0 text-white">{item.product_name}</p>
                        <small className="text-white">
                          ₹{getFirstPrice(item).toFixed(2)}{" "}
                          {getFirstDiscount(item) > 0 && (
                            <del style={{ color: "#aaa" }}>
                              ₹
                              {(
                                getFirstPrice(item) + getFirstDiscount(item)
                              ).toFixed(2)}
                            </del>
                          )}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductToastModal;

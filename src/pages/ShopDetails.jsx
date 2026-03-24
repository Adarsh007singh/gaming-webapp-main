import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductToastModal from "../components/ProductToastModal"; // adjust path if needed
import logo from "../assets/img/logo2.webp";
import { useProducts } from "../context/ProductContext";
import ReviewSection from "../components/ReviewSection";
import { useCartContext } from "../context/CartContext";
import BASE_URL from "../config";
import axios from "axios";

// Products data inside the same file

const ShopDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastProduct, setToastProduct] = useState(null);
  const { productDetail, fetchProductDetail } = useProducts();
  const [showSave, setShowSave] = useState(false);
  console.log(productDetail, "hbsudhdudhsuayussssssssssssssssss");
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSave(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };
  console.log(products, "ghscuiskhfuiskzfhzkf");

  // const handleAddToCart = () => {
  //   if (!productDetail) return;

  //   const { id, name, image, price } = productDetail;
  //   const quantityToAdd = quantity; // quantity is already in your useState

  //   addToCart(id, quantityToAdd, name, image, price);
  //   setToastProduct({ ...productDetail, quantity: quantityToAdd });
  //   setShowToast(true);
  // };

const handleAddToCart = () => {
  if (!productDetail) return;

  const product_id = productDetail.product_id || productDetail.id; // Use correct key
  const name = productDetail.product_name || productDetail.name;
  const image = productDetail.image;
  const quantityToAdd = quantity;
  const price = (() => {
    try {
      const parsed = JSON.parse(productDetail.price);
      return parseFloat(parsed?.[0]?.price) || 0;
    } catch {
      return 0;
    }
  })();

  addToCart(product_id, quantityToAdd, name, image, price);
  setToastProduct({ ...productDetail, quantity: quantityToAdd });
  setShowToast(true);
};

  useEffect(() => {
    if (id) {
      fetchProductDetail(parseInt(id, 10));
      console.log(productDetail);
    }
  }, [id, fetchProductDetail]);

  useEffect(() => {
    if (toastProduct) {
      console.log("Updated toast product:", toastProduct);
    }
  }, [toastProduct]);

  if (!productDetail) return <p>Loading...</p>;
  return (
    <>
      <div className="container-fluid text-white">
        <div className="row">
          <div className="col-lg-8 ps-md-5">
            <div
              className="container my-4"
              style={{
                backgroundColor: "rgba(17, 50, 82, 0.61)",
                borderRadius: "10px",
              }}
            >
              <section className="py-5">
                <div className="row g-5">
                  {/* Image Section */}
                  <div className="col-md-5">
                    <div className="rounded overflow-hidden shadow-sm position-relative">
                      <img
                        src={
                          productDetail.image &&
                          productDetail.image.startsWith("http")
                            ? productDetail.image
                            : productDetail.image
                            ? `${BASE_URL}/uploads/${productDetail.image}`
                            : "/default-product-image.png" // fallback image path (adjust if needed)
                        }
                        alt={productDetail.name || "Product image"}
                        className="img-fluid border border-4 border-info"
                      />
                      {productDetail.discount && productDetail.price && (
                        <div className="badge bg-danger position-absolute top-0 start-0 m-3">
                          -
                          {Math.round(
                            (productDetail.discount /
                              (productDetail.price + productDetail.discount)) *
                              100
                          )}
                          %
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Info Section */}
                  <div className="col-md-7">
                    <h2 className="text-info mb-3">{productDetail.name}</h2>
                    {productDetail.rating > 0 && (
                      <div className="mb-3">
                        {Array.from({ length: 5 }, (_, i) => (
                          <i
                            key={i}
                            className={`fa-star ${
                              i < productDetail.rating
                                ? "fas text-warning"
                                : "far text-secondary"
                            }`}
                          ></i>
                        ))}
                      </div>
                    )}

                    {(() => {
                      const finalRate = (() => {
                        try {
                          const parsed = JSON.parse(productDetail.final_rate);
                          return parsed?.[0]?.finalRate || 0;
                        } catch {
                          return 0;
                        }
                      })();

                      const discountAmount = (() => {
                        try {
                          const parsed = JSON.parse(
                            productDetail.discount_amount
                          );
                          return parsed?.[0]?.discountAmount || 0;
                        } catch {
                          return 0;
                        }
                      })();

                      const originalPrice = finalRate + discountAmount;

                      return (
                        <div className="d-flex align-items-center justify-content-start mb-4">
                          {/* Final discounted price */}
                          <h1 className="text-white display-4 fw-bold mb-0">
                            ₹{finalRate.toFixed(2)}
                          </h1>

                          {/* Original price (strike-through) */}
                          {discountAmount > 0 && (
                            <div className="ms-3">
                              <p
                                className="text-decoration-line-through fs-1 mb-0"
                                style={{ color: "#babec2", fontWeight: 700 }}
                              >
                                ₹{originalPrice.toFixed(2)}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* <div className="d-flex align-items-center justify-content-start mb-4">
                      <h1 className="text-white display-4 fw-bold mb-0">
                        ₹{productDetail.price.toFixed(2)}
                      </h1>
                      <div className="ms-3">
                        <p
                          className="text-decoration-line-through fs-1 mb-0"
                          style={{ color: "#babec2", fontWeight: 700 }}
                        >
                          ₹{productDetail.discount.toFixed(2)}
                        </p>
                      </div>
                    </div> */}
                    <h5 className="py-3 ">Steam Account</h5>
                    <p className="pt-2 view-ditails ">
                      Release Date :{" "}
                      {productDetail.release_date &&
                        new Date(productDetail.release_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                    </p>

                    <p className="pt-2 view-ditails">
                      Platform : {productDetail.plateform}
                    </p>
                    <p className="pt-2 view-ditails">
                      Region : {productDetail.region}
                    </p>
                    <p className="py-2 view-ditails">Lifetime Warranty</p>
                    <hr />
                    <div className="d-flex align-items-center mb-4 py-3">
                      <div
                        className="d-flex p-2"
                        style={{ border: "1px solid #006CB5" }}
                      >
                        <button
                          className="btn border-0 text-white"
                          onClick={() => handleQuantityChange(-1)}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <input
                          type="text"
                          value={quantity}
                          readOnly
                          className="form-control text-center mx-2 text-white bg-transparent border-0"
                          style={{ width: "60px" }}
                        />
                        <button
                          className="btn border-0 text-white"
                          onClick={() => handleQuantityChange(1)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                      <button
                        className="btn text-white px-4 fw-bold ms-2 p-3 w-50"
                        style={{ backgroundColor: "#006CB5" }}
                        onClick={() => handleAddToCart(productDetail)}
                      >
                        <i className="fas fa-shopping-cart me-2"></i> Add to
                        Cart
                      </button>
                      {/* <Link
                        to="/cart"
                        className="btn text-white px-4 fw-bold ms-2 p-3 w-50"
                        style={{ backgroundColor: "#377f00" }}
                      >
                        <i className="fas fa-shopping-cart me-2"></i> View Cart
                      </Link> */}
                    </div>
                    <hr />
                    <p className="pt-4">
                      CATEGORIES: {productDetail.category_names.join(", ")}
                    </p>
                  </div>
                </div>
              </section>

              {/* Tabs Section */}
              <section className="py-5">
                <ul
                  className="nav nav-pills mb-3 d-flex justify-content-center align-items-center"
                  role="tablist"
                >
                  <li className="nav-item">
                    <button
                      className="nav-link active btn"
                      data-bs-toggle="pill"
                      data-bs-target="#desc"
                      style={{ border: "1px solid #006CB5" }}
                    >
                      DESCRIPTION
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      data-bs-toggle="pill"
                      data-bs-target="#req"
                      style={{ border: "1px solid #006CB5" }}
                    >
                      ADDITIONAL INFORMATION
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      data-bs-toggle="pill"
                      data-bs-target="#rev"
                      style={{ border: "1px solid #006CB5" }}
                    >
                      REVIEWS
                    </button>
                  </li>
                </ul>
                <div className="tab-content text-white p-4">
                  <div className="tab-pane fade show active" id="desc">
                    {productDetail.offline_account && (
                      <>
                        <h5>Offline Account</h5>
                        <p>{productDetail.offline_account}</p>
                      </>
                    )}

                    {productDetail.safe_accounts && (
                      <>
                        <h5>Safe Account</h5>
                        <p>{productDetail.safe_accounts}</p>
                      </>
                    )}

                    {productDetail.instant_updates && (
                      <>
                        <h5>Instant Updates for the Games</h5>
                        <p>{productDetail.instant_updates}</p>
                      </>
                    )}

                    {productDetail.lighting_fast_support && (
                      <>
                        <h5>Lightning Fast Support</h5>
                        <p>{productDetail.lighting_fast_support}</p>
                      </>
                    )}

                    {productDetail.terms && (
                      <>
                        <h5>Terms</h5>
                        <p>{productDetail.terms}</p>
                      </>
                    )}
                  </div>

                  <div className="tab-pane fade" id="req">
                    <table class="table table-bordered  table-striped ">
                      <tbody>
                        <tr className="text-white">
                          <th scope="row" className="py-5 w-25">
                            Minimum System Requirements
                          </th>
                          <td className="py-5 w-50">
                            {productDetail.additional_info1}
                          </td>
                        </tr>
                        <tr className="text-white">
                          <th scope="row" className="py-5 w-25">
                            Recommended System Requirements
                          </th>
                          <td className="py-5 w-50">
                            {" "}
                            {productDetail.additional_info2}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="tab-pane fade" id="rev">
                    <ReviewSection productId={productDetail.id} />
                  </div>
                </div>
              </section>

              {/* Related Products */}
              <section className="bg-black py-5 d-none d-lg-block">
                <div className="container">
                  <h3 className="text-white mb-4">Related Products</h3>
                  <div className="row">
                    {products.slice(0, 4).map((product) => (
                      <div
                        key={product.id}
                        className="col-lg-3 col-md-6 col-sm-12 mb-4"
                      >
                        <div className="card bg-black text-white border-0 rounded-4 position-relative overflow-hidden">
                          <img
                            src={
                              product.image && product.image.startsWith("http")
                                ? product.image
                                : product.image
                                ? `${BASE_URL}/uploads/${product.image}`
                                : "/default-product-image.png" // fallback image path (adjust if needed)
                            }
                            className="card-img-top"
                            alt={product.name}
                            style={{
                              height: "350px",
                              objectFit: "cover",
                              width: "100%",
                            }}
                          />
                          {product.discount && product.price && (
                            <div className="badge bg-danger position-absolute top-0 start-0 m-3">
                              -
                              {Math.round(
                                (product.discount /
                                  (product.price + product.discount)) *
                                  100
                              )}
                              %
                            </div>
                          )}

                          <div
                            className="card-body text-center bg-dark"
                            style={{ height: "200px" }}
                          >
                            <h5 className="fw-bold text-white">
                              {product.name}
                            </h5>
                            <p className="mb-0 text-neon text-white">
                              {product.para || "Category, Game, Bestseller"}
                            </p>
                            <Link
                              to={`/shop-details/${product.id}`}
                              className="btn shadow-sm mt-2"
                              aria-label={`View details of ${product.name}`}
                            >
                              <i className="fas fa-eye"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12 d-flex flex-column align-items-center my-4">
            <div
              className="card promo-card text-white text-center"
              style={{ maxWidth: "400px", width: "100%" }}
            >
              <div className="logo d-flex justify-content-center mt-4">
                <img src={logo} height={120} alt="Logo" />
              </div>
              <h2 className="mt-3 fw-bold">
                <span>Save</span> Buy More
              </h2>
              <p className="px-3">
                <strong>FLAT 10% CASHBACK</strong> on every order up to ₹100.
                <br />
                Access to exclusive sales.
                <br />
                Get a game for ₹99 every week.
                <br />
                Early access to upcoming AAA games.
                <br />
                Exclusive giveaway entries.
              </p>
              <h2 className="text-white mb-4"> Launching Soon!</h2>
            </div>

            <div className="text-center mt-4">
              <h1 className="fw-bold">India's Most</h1>
              <h1 className="text-primary fw-bold">TRUSTED</h1>
              <h1 className="text-primary fw-bold">Loved</h1>
              <h1 className="fw-bold">Gaming Store</h1>
            </div>
            <div
              id="reviewCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {/* Review Card 1 */}
                <div className="carousel-item active">
                  <div
                    className="card review-card text-white text-center p-4"
                    style={{ width: "450px" }}
                  >
                    <i className="fa-solid fa-users fs-2 mb-2"></i>
                    <div className="pt-4">
                      <p className="mb-3">
                        "They really made my weekend... it's Wukong time now!"
                      </p>
                      <div className="d-flex justify-content-center">
                        {[...Array(5)].map((_, idx) => (
                          <i
                            key={idx}
                            className="fa-solid fa-star text-warning mx-1"
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-center">
                    <strong>Salman Shaikh</strong>
                  </p>
                  <p className="text-center">Customer</p>
                </div>

                {/* Review Card 2 */}
                <div className="carousel-item ">
                  <div
                    className="card review-card text-white text-center p-4"
                    style={{ width: "450px" }}
                  >
                    <i className="fa-solid fa-user-ninja fs-2 mb-2"></i>
                    <div className="pt-4">
                      <p className="mb-3">
                        "Best website for getting latest games they have amazing
                        customer support"
                      </p>
                      <div className="d-flex justify-content-center">
                        {[...Array(5)].map((_, idx) => (
                          <i
                            key={idx}
                            className="fa-solid fa-star text-warning mx-1"
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-center pt-2">
                    <strong>Devansh Saxena</strong>
                  </p>
                  <p className="text-center">Customer</p>
                </div>
                {/* Review Card 3 */}

                <div className="carousel-item ">
                  <div
                    className="card review-card text-white text-center p-4"
                    style={{ width: "450px" }}
                  >
                    <i className="fa-solid fa-user-ninja fs-2 mb-2"></i>
                    <div className="pt-4">
                      <p className="mb-3">
                        "Have been buying games from last 6 months didnt face
                        any issues yet"
                      </p>
                      <div className="d-flex justify-content-center">
                        {[...Array(5)].map((_, idx) => (
                          <i
                            key={idx}
                            className="fa-solid fa-star text-warning mx-1"
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-center pt-2">
                    <strong>Aarav Sharma</strong>
                  </p>
                  <p className="text-center">Customer</p>
                </div>
                {/* Review Card 4 */}

                <div className="carousel-item ">
                  <div
                    className="card review-card text-white text-center p-4"
                    style={{ width: "450px" }}
                  >
                    <i className="fa-solid fa-user-ninja fs-2 mb-2"></i>
                    <div className="pt-4">
                      <p className="mb-3">"Games chalte hain mast"</p>
                      <div className="d-flex justify-content-center">
                        {[...Array(5)].map((_, idx) => (
                          <i
                            key={idx}
                            className="fa-solid fa-star text-warning mx-1"
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-center pt-2">
                    <strong>Mohd Aqib</strong>
                  </p>
                  <p className="text-center">Customer</p>
                </div>
              </div>

              {/* Controls */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#reviewCarousel"
                data-bs-slide="prev"
              >
                <i class="fa-solid fa-arrow-left-long fs-2"></i>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#reviewCarousel"
                data-bs-slide="next"
              >
                <i class="fa-solid fa-arrow-right-long fs-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <ProductToastModal
          product={toastProduct}
          saggestedProduct={products}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default ShopDetails;

import React, { useEffect, useState } from "react";

import logo from "../assets/img/gamelogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import BASE_URL from "../config";
import { useUserDetails } from "../context/UserDetailsContext";
const Header = () => {
  const navigate = useNavigate();
  const { count, cartItems, clearCart } = useCartContext();
  const {userName} = useUserDetails();
  const { categories } = useProducts();
  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const userToken = sessionStorage.getItem("token");
  const [lastSearch, setLastSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q") || "";
    setSearchTerm(q);
    setLastSearch(q);
  }, []);

  useEffect(() => {
    const trimmed = searchTerm.trim();

    const timer = setTimeout(() => {
      if (trimmed.length >= 3 && trimmed !== lastSearch) {
        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
        setLastSearch(trimmed);
      }

      if (trimmed.length === 0 && lastSearch !== "") {
        navigate("/search?q=");
        setLastSearch("");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchTerm("");
      setLastSearch("");
    }
  }, [location.pathname]);
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    clearCart(); ////mahima
    navigate("/login");
  };

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubTotal(total);
  }, [cartItems]);


  console.log(cartItems,"cartinnnnnnnn")
  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid" style={{background:"black"}}>
        <div className="row align-items-center py-3 px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a href="/" className="text-decoration-none">
              <img src={logo} height={50} alt="Logo" />
            </a>
          </div>
          <div className="col-lg-6 col-6 text-left">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #0483b5",
                  }}
                />
                <button className="btn btn-outline-primary" type="submit">
                  <i className="fa fa-search text-white"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-3 col-6 text-end d-flex justify-content-end align-items-center gap-3">
            <div
              className="position-relative"
              onMouseEnter={() => setShowPreview(true)}
              onMouseLeave={() => setShowPreview(false)}
            >
              <a className="text-decoration-none">
                <i className="fas fa-shopping-cart text-white fs-6"></i>

                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    backgroundColor: "#0483b5",
                    fontSize: "0.5rem",
                    padding: "4px 6px",
                  }}
                >
                  {count}
                </span>
              </a>

              {showPreview && cartItems.length > 0 && (
                <div
                  className="cart-preview shadow"
                  style={{
                    backgroundColor: "#222",
                    zIndex: 100,
                  }}
                >
                  <div className="cart-items-list">
                    {cartItems.map((item, index) => (
                      <>
                        <div className="cart-item">
                          <img
                            src={
                              item.image?.startsWith("http")
                                ? item.image
                                : item.image
                                ? `${BASE_URL}/uploads/${item.image}`
                                : "/default-product-image.png"
                            }
                            className="card-img-top"
                            alt={item.name}
                          />
                        </div>
                        <div>
                          <div
                            className="fw-semibold text-start"
                            style={{ color: "#0483b5" }}
                          >
                            {item.name}
                          </div>
                          <div className="text-white text-start">
                            {item.quantity} × ₹{item.final_rate}
                            {/* {item.quantity} × ₹{item.price} */}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="d-flex fw-bold text-white">
                    <span>Subtotal:</span>
                    <span className="ms-1">₹{subTotal.toFixed(2)}</span>
                  </div>

                  <div className="mt-3 d-flex justify-content-between">
                    <Link
                      to="/cart"
                      className="btn btn-secondary btn-sm w-50 p-2"
                    >
                      View Cart
                    </Link>
                    <Link
                      to="/checkout"
                      className="btn btn-secondary btn-sm w-50 ms-1 p-2"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {/* {userToken ? (
              <Link
                onClick={handleLogout}
                className="btn text-white"
                style={{ backgroundColor: "#0483b5" }}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn text-white"
                  style={{ backgroundColor: "#0483b5" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn text-white"
                  style={{ backgroundColor: "#0483b5" }}
                >
                  Register
                </Link>
              </>
            )} */}
            {userToken ? (
              <div className="d-flex align-items-center gap-2">
               <Link to="/user-dashboard"> <i className="fas fa-user text-white fs-5"></i>
                <span className="text-white fw-semibold">{userName}</span></Link>
                <button
                  onClick={handleLogout}
                  className="btn text-white btn-sm ms-2"
                  style={{ backgroundColor: "#0483b5" }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn text-white"
                  style={{ backgroundColor: "#0483b5" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn text-white"
                  style={{ backgroundColor: "#0483b5" }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 px-0">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
              <a href="/" className="text-decoration-none d-block d-lg-none">
                <img src={logo} height={50} alt="Logo" />
              </a>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse justify-content-center p-3"
                id="navbarCollapse"
                style={{
                  background:
                    "linear-gradient(107deg, rgb(19, 25, 33) 0%, rgb(22, 75, 128) 100%)",
                }}
              >
                <div className="navbar-nav mx-auto py-0">
                  <Link to="/" className="nav-item nav-link text-white active">
                    HOME
                  </Link>
                  <Link
                    to="/category/bestseller"
                    className="nav-item nav-link text-white"
                  >
                    BESTSELLER
                  </Link>

                  <div className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle text-white"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      CATEGORY
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      {categories.slice(0, 30).map((category) => (
                        <li key={category}>
                          <Link
                            className="dropdown-item"
                            to={`/category/${category
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            {category}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href="/cart" className="nav-item nav-link text-white">
                    CART
                  </a>
                  <a href="/contact" className="nav-item nav-link text-white">
                    CONTACT
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Navbar End */}
    </>
  );
};

export default Header;

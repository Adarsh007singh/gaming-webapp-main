import React, { useState } from "react";
import carousel1 from "../assets/img/carousel1.webp";
import carousel2 from "../assets/img/carousel2.webp";
import carousel3 from "../assets/img/carousel3.webp";
import carousel4 from "../assets/img/carousel4.webp";
import carousel5 from "../assets/img/carousel5.webp";
import carousel6 from "../assets/img/carousel6.webp";
import carousel7 from "../assets/img/carousel7.webp";
import carousel8 from "../assets/img/carousel8.webp";
import carousel9 from "../assets/img/carousel9.webp";
import carousel10 from "../assets/img/carousel10.webp";
// import HomeProducts from "../component/HomeProducts";
import videoImg1 from "../assets/img/videoImg1.webp";
import videoImg2 from "../assets/img/videoImg2.webp";
import smallbanner from "../assets/img/banner1.webp";
import banner from "../assets/img/banner.webp";
import banner2 from "../assets/img/banner2.webp";
import HomeProducts from "../components/HomeProducts";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    latestReleases,
    ourBestSellers,
    criticallyAcclaimed,
    bestStoryMode,
    actionAdventure,
    ourRecommendations,
    loading,
  } = useProducts();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  console.log("dcfdcf",criticallyAcclaimed);
  const homebestSeller = ourBestSellers.slice(0, 6);

  const handleClick=()=>{
    setIsVideoPlaying(true)
  }
  return (
    <div className="container-fluid mb-5">
      {/* === Carousel Section === */}
      <div className="row">
        <div className="col-12 p-0">
          <div
            id="header-carousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to="4"
                aria-label="Slide 5"
              ></button>
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to="5"
                aria-label="Slide 6"
              ></button>
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to="6"
                aria-label="Slide 7"
              ></button>
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to="7"
                aria-label="Slide 8"
              ></button>
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to="8"
                aria-label="Slide 9"
              ></button>
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to="9"
                aria-label="Slide 10"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={carousel1}
                  className="d-block w-100"
                  alt="Slide 1"
                  style={{ maxHeight: "600px", objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carousel2}
                  className="d-block w-100"
                  alt="Slide 2"
                  style={{ maxHeight: "600px", objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carousel3}
                  className="d-block w-100"
                  alt="Slide 3"
                  style={{ maxHeight: "600px", objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carousel4}
                  className="d-block w-100"
                  alt="Slide 4"
                  style={{ maxHeight: "600px", objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carousel5}
                  className="d-block w-100"
                  alt="Slide 5"
                  style={{ maxHeight: "600px", objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carousel6}
                  className="d-block w-100"
                  alt="Slide 6"
                  style={{ maxHeight: "600px", objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carousel7}
                  className="d-block w-100"
                  alt="Slide 7"
                  style={{ maxHeight: "600px", objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carousel8}
                  className="d-block w-100"
                  alt="Slide 8"
                  style={{ maxHeight: "600px", objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carousel9}
                  className="d-block w-100"
                  alt="Slide 9"
                  style={{ maxHeight: "600px", objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carousel10}
                  className="d-block w-100"
                  alt="Slide 10"
                  style={{ maxHeight: "600px", objectFit: "cover" }}
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#header-carousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#header-carousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="px-5 pt-3">
        {/* === Latest Releases === */}
        <div className="pt-5 pb-3">
          <h2 className="text-white fw-bold">Latest Release</h2>
        </div>
        <div className="row">
          <HomeProducts products={latestReleases} />
        </div>

        {/* === Video Section === */}
          <div className="row my-4">
      {/* Left Side: Static Image with Buy Now Button */}
      <div className="col-12 col-md-6 position-relative mb-4 mb-md-0">
        <div
          className="position-relative w-100 cursor-pointer"
          style={{
            height: "400px",
            borderRadius: "20px",
            overflow: "hidden",
          }}
          onClick={handleClick}
        >
          <img
            src={videoImg2}
            className="w-100 h-100"
            alt="Click to Play Video"
            style={{ objectFit: "cover", borderRadius: "20px" }}
          />

          {/* Buy Now Button - Bottom Right */}
          <Link
           to="/category/bestseller"
            className="position-absolute btn btn-primary"
            style={{
              bottom: "25px",
              right: "25px",
              backgroundColor: "#b7ab94",
              border: "none",
              padding: "8px 16px",
              color: "black",
            }}
          >
            <i className="fa-solid fa-circle-check me-1"></i> Buy Now
          </Link>
        </div>
      </div>

      {/* Right Side: Clickable Image -> YouTube Video */}
      <div className="col-12 col-md-6">
        {isVideoPlaying ? (
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/ClR9n7eo3PE?autoplay=1"
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "20px", width: "100%" }}
          ></iframe>
        ) : (
          <img
            src={videoImg1}
            className="w-100 cursor-pointer"
            alt="Click to Play Video"
            style={{
              height: "400px",
              borderRadius: "20px",
              objectFit: "cover",
            }}
            onClick={handleClick}
          />
        )}
      </div>
    </div>

        {/* === Our Bestseller === */}
        <div className="pb-3">
          <h2 className="text-white fw-bold">Our Bestseller</h2>
        </div>
        <div className="row">
          <HomeProducts products={homebestSeller} />
        </div>

        {/* === Small Promo Banner === */}
        <div className="row my-4">
          <div className="col-md-6">
            <img
              src={smallbanner}
              className="w-100"
              alt="Small Banner"
              style={{ borderRadius: "20px" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card text-white p-4 text-center h-100 small-card-outer">
              <div className="card-body">
                <h1 className="card-title fw-bold">CPG PLUS</h1>
                <h3 className="card-text mb-2">
                  <del className="text-muted">₹149</del>{" "}
                  <span style={{ color: "#61CE70" }}>₹99</span> / Month
                </h3>
                <ul className="list-unstyled mt-3 mb-4 small-card-list">
                  <li>
                    <i
                      class="fa-solid fa-cloud fs-5 me-1"
                      style={{ color: "#61CE70" }}
                    ></i>{" "}
                    Free Trial for Playstation Remote Play
                  </li>
                  <li>
                    <i
                      class="fa-solid fa-check fs-5 fw-bold me-1"
                      style={{ color: "#61CE70", fontWeight: 900 }}
                    ></i>{" "}
                    Unlimited 10% Flat Off on PC Games
                  </li>
                  <li>
                    <i
                      class="fa-solid fa-check fs-5 me-1"
                      style={{ color: "#61CE70" }}
                    ></i>{" "}
                    Access to Weekly Sales
                  </li>
                  <li>
                    <i
                      class="fa-solid fa-check fs-5 me-1"
                      style={{ color: "#61CE70" }}
                    ></i>{" "}
                    Priority in Pre Orders
                  </li>
                  <li>
                    <i
                      class="fa-solid fa-check fs-5 me-1"
                      style={{ color: "#61CE70" }}
                    ></i>{" "}
                    Exclusive Giveaways
                  </li>
                </ul>
                <button className="btn w-25 small-card-btn">COMING SOON</button>
              </div>
            </div>
          </div>
        </div>

        {/* === Critically Acclaimed === */}
        <div className="pb-3">
          <h2 className="text-white fw-bold">Critically Acclaimed</h2>
        </div>
        <div className="row">
          <HomeProducts products={criticallyAcclaimed} />
        </div>

        {/* === Best Story Mode === */}
        <div className="pb-3">
          <h2 className="text-white fw-bold">Best Story Mode</h2>
        </div>
        <div className="row">
          <HomeProducts products={bestStoryMode} />
        </div>

        {/* === Small Banners === */}
        <div className="row my-4">
          <div className="col-md-6 position-relative">
            <img
              src={banner2}
              className="w-100"
              alt="Small Banner"
              style={{ borderRadius: "20px" }}
            />
            <Link
             to="/category/bestseller"
              className="position-absolute btn btn-primary"
              style={{
                bottom: "25px",
                right: "25px",
                backgroundColor: "#b7ab94",
                border: "none",
                padding: "8px 16px",
                color: "black",
              }}
            >
              <i className="fa-solid fa-circle-check me-1"></i> Buy Now
            </Link>
          </div>
          <div className="col-md-6 position-relative">
            <img
              src={banner}
              className="w-100"
              alt="Small Banner"
              style={{ borderRadius: "20px" }}
            />
            <Link
             to="/category/bestseller"
              className="position-absolute btn btn-primary"
              style={{
                bottom: "25px",
                right: "25px",
                backgroundColor: "#b7ab94",
                border: "none",
                padding: "8px 16px",
                color: "black",
              }}
            >
              <i className="fa-solid fa-circle-check me-1"></i> Buy Now
            </Link>
          </div>
        </div>

        {/* === Action Adventure === */}
        <div className="pb-3">
          <h2 className="text-white fw-bold">Action Adventure</h2>
        </div>
        <div className="row">
          <HomeProducts products={actionAdventure} />
        </div>

        {/* === Our Recommendation === */}
        <div className="pb-3">
          <h2 className="text-white fw-bold">Our Recommendation</h2>
        </div>
        <div className="row">
          <HomeProducts products={ourRecommendations} />
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Link } from "react-router-dom";
// import { useCartContext } from "../context/CartContext";
// import { toast } from "react-toastify";
// import BASE_URL from "../config";

// const HomeProducts = ({ products = [] }) => {
//   const { addToCart } = useCartContext();
//   const slidesToShow = 5;

//   const paddedProducts = [
//     ...products,
//     ...Array(Math.max(slidesToShow - products.length, 0)).fill(null),
//   ];

//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 600,
//     slidesToShow,
//     slidesToScroll: 1,
//     autoplay: true,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: Math.min(products.length, 3),
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: Math.min(products.length, 2),
//         },
//       },
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: Math.min(products.length, 1),
//         },
//       },
//     ],
//   };

//   const handleAddToCart = (product) => {
//     if (!product) return ;

//     const { id, name, image, price } = product;
//     const quantity = 1; // default to 1 on button click

//     addToCart(id, quantity, name, image, price);
//     toast.success(`${name} added to cart!`);
//   };

//   return (
//     <div className="container-fluid productCard-outer pb-4">
//       <Slider {...settings}>
//         {paddedProducts.map((product, index) => (
//           <div key={index} className="p-2">
//             {product ? (
//               <div className="card text-light border-0 rounded-4 product-card">
//                 <div className="position-relative overflow-hidden rounded-top-4">
//                   <img
//                     src={
//                       product.image?.startsWith("http")
//                         ? product.image
//                         : product.image
//                         ? `${BASE_URL}/uploads/${product.image}`
//                         : "/default-product-image.png"
//                     }
//                     className="card-img-top product-img"
//                     alt={product.name || "Product image"}
//                     style={{
//                       height: "350px",
//                       objectFit: "cover",
//                       width: "100%",
//                     }}
//                   />

//                   <div className="product-icons d-flex gap-2">
//                     <Link
//                       to={`/shop-details/${product.id}`}
//                       className="btn shadow-sm"
//                       aria-label={`View details of ${product.name}`}
//                     >
//                       <i className="fas fa-eye"></i>
//                     </Link>
//                     <button
//                       className="btn shadow-sm"
//                       aria-label={`Add ${product.name} to cart`}
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       <i className="fas fa-shopping-cart"></i>
//                     </button>
//                   </div>

//                   {product.discount && product.discount > product.price && (
//                     <div className="badge bg-danger position-absolute top-0 start-0 m-2">
//                       -{Math.round(
//                         ((product.discount - product.price) /
//                           product.discount) *
//                           100
//                       )}%
//                     </div>
//                   )}
//                 </div>

//                 <div
//                   className="card-body d-flex flex-column text-center bg-dark"
//                   style={{ height: "120px" }}
//                 >
//                   <h6
//                     className="fw-bold"
//                     style={{ color: "#00FFFC", fontSize: "16px" }}
//                   >
//                     {product.name}
//                   </h6>
//                   <div className="d-flex justify-content-center align-items-center">
//                     <h5 className="mb-0 text-neon text-white fs-3">
//                       ₹{product.price.toFixed(2)}
//                     </h5>
//                     {product.discount && (
//                       <small className="text-muted ms-2 fs-4">
//                         <del>₹{product.discount.toFixed(2)}</del>
//                       </small>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div style={{ height: "350px" }}></div>
//             )}
//           </div>
//         ))}
//       </Slider>

//     </div>
//   );
// };

// export default HomeProducts;



import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import BASE_URL from "../config";

const HomeProducts = ({ products = [] }) => {
  const { addToCart } = useCartContext();
  const slidesToShow = 5;

  const paddedProducts = [
    ...products,
    ...Array(Math.max(slidesToShow - products.length, 0)).fill(null),
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(products.length, 3),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(products.length, 2),
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: Math.min(products.length, 1),
        },
      },
    ],
  };

const getFirstPrice = (product) => {
  // Use final_rate if available
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
  // fallback to price
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


  const handleAddToCart = (product) => {
    if (!product) return;

    const id = product.product_id;
    const name = product.product_name;
    const image = product.image;
    const price = getFirstPrice(product.price) || 0;
    const quantity = 1;

    addToCart(id, quantity, name, image, price);
    toast.success(`${name} added to cart!`);
  };

  return (
    <div className="container-fluid productCard-outer pb-4">
      <Slider {...settings}>
        {paddedProducts.map((product, index) => (
          <div key={index} className="p-2">
            {product ? (
              <div className="card text-light border-0 rounded-4 product-card">
                <div className="position-relative overflow-hidden rounded-top-4">
                  <img
                    src={
                      product.image?.startsWith("http")
                        ? product.image
                        : product.image
                        ? `${BASE_URL}/uploads/${product.image}`
                        : "/default-product-image.png"
                    }
                    className="card-img-top product-img"
                    alt={product.product_name || "Product image"}
                    style={{
                      height: "350px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />

                  <div className="product-icons d-flex gap-2">
                    <Link
                      to={`/shop-details/${product.product_id}`}
                      className="btn shadow-sm"
                      aria-label={`View details of ${product.product_name}`}
                    >
                      <i className="fas fa-eye"></i>
                    </Link>
                    <button
                      className="btn shadow-sm"
                      aria-label={`Add ${product.product_name} to cart`}
                      onClick={() => handleAddToCart(product)}
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>

                  {/* ✅ FIXED: pass full product */}
                  {getFirstDiscount(product) > getFirstPrice(product) && (
                    <div className="badge bg-danger position-absolute top-0 start-0 m-2">
                      -
                      {Math.round(
                        ((getFirstDiscount(product) - getFirstPrice(product)) /
                          getFirstDiscount(product)) *
                          100
                      )}
                      %
                    </div>
                  )}
                </div>

                <div
                  className="card-body d-flex flex-column text-center bg-dark"
                  style={{ height: "120px" }}
                >
                  <h6
                    className="fw-bold"
                    style={{ color: "#00FFFC", fontSize: "16px" }}
                  >
                    {product.product_name}
                  </h6>
                  <div className="d-flex justify-content-center align-items-center">
                    {/* Final Price */}
                    <h5 className="mb-0 text-neon text-white fs-3">
                      ₹{getFirstPrice(product).toFixed(2)}
                    </h5>

                    {/* Original Price (MRP = Final + Discount) */}
                    {getFirstDiscount(product) > 0 && (
                      <small className="text-muted ms-2 fs-4">
                        <del>
                          ₹
                          {(
                            getFirstPrice(product) + getFirstDiscount(product)
                          ).toFixed(2)}
                        </del>
                      </small>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ height: "350px" }}></div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeProducts;

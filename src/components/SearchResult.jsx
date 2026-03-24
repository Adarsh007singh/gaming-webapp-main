import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../config";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
   const navigate = useNavigate(); 
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {

      if (!query || query.trim().length < 2) {
      navigate("/"); 
      return;
    }
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${BASE_URL}/search_products?q=${encodeURIComponent(query)}`
        );
        setResults(res.data.data || []);
        console.log(res.data.data, "search");
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query?.length >= 3) {
      fetchResults();
    }
  }, [query]);

  return (
    <>
      <div className="container py-5" style={{ minHeight: "100vh" }}>
        <h2 className="text-white fw-bold mb-4">Search Results for {query}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {results.map((product, index) => (
              <div className="col" key={index}>
                <div className="card h-100 text-white search-card-outer">
                  <div
                    className="p-3 text-uppercase text-white"
                    style={{ fontSize: "13px" }}
                  >
                    {product.category_names}
                  </div>
                  <h5 className="px-3 fw-bold">{product.product_name}</h5>
                  <Link to={`/shop-details/${product.product_id}`}>
                    <img
                      src={
                        product.image?.startsWith("http")
                          ? product.image
                          : product.image
                          ? `${BASE_URL}/uploads/${product.image}`
                          : "/default-product-image.png"
                      }
                      className="card-img-top mt-2"
                      alt={product.title}
                      style={{
                        height: "270px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  </Link>

                  <div className="card-body">
                    <p className="search-card-text small">
                      {product.plateform} Account Release Date :{" "}
                      {new Date(product.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                      <br />
                      Platform : {product.platform} Region : {product.region}
                      <br />
                      Lifetime Warranty
                    </p>
                  </div>
                  <div
                    className=" small d-flex align-items-center text-white pb-3 ps-3"
                    style={{ fontSize: "15px" }}
                  >
                    <span>CPG</span>
                    <span className="px-2"> / </span>
                    <span>
                      {" "}
                      {new Date(product.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                    {product.reviews && (
                      <>
                        <span>/</span>
                        <span>{product.reviews}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
};

export default SearchResults;

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const SearchResults = () => {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   const query = new URLSearchParams(location.search).get("q");

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.post(
//           `http://localhost:9000/search_products?q=${encodeURIComponent(query)}`
//         );
//         setResults(res.data.data || []);
//         console.log(results)
//       } catch (error) {
//         console.error("Search error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (query?.length >= 3) {
//       fetchResults();
//     }
//   }, [query]);

//   return (
//     <div className="container mt-4">
//       <h2>Search Results for: "{query}"</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : results.length > 0 ? (
//         <div className="row">
//           {results.map((product, index) => (
//             <div className="col-md-4 mb-3" key={index}>
//               <div className="card">
//                 <img src={product.image} className="card-img-top" alt={product.product_name} />
//                 <div className="card-body">
//                   <h5 className="card-title">{product.product_name}</h5>
//                   <p className="card-text">
//                     Platform: {product.plateform} <br />
//                     Region: {product.region} <br />
//                     Categories: {product.category_names}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No products found.</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;

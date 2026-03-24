// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const ProductContext = createContext();
// export const useProducts = () => useContext(ProductContext);

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [productDetail, setProductDetail] = useState(null);
//   const [productDetailsCache, setProductDetailsCache] = useState({});
//   const [latestReleases, setLatestReleases] = useState([]);
//   const [ourBestSellers, setOurBestSellers] = useState([]);
//   const [criticallyAcclaimed, setCriticallyAcclaimed] = useState([]);
//   const [bestStoryMode, setBestStoryMode] = useState([]);
//   const [actionAdventure, setActionAdventure] = useState([]);
//   const [ourRecommendations, setOurRecommendations] = useState([]);
//   const [categoryFilteredProducts, setCategoryFilteredProducts] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//   const slugify = (str) => str.toLowerCase().replace(/\s+/g, "-");
//   const definedCategories = [
//     "Action",
//     "Adventure",
//     "Open World",
//     "Horror",
//     "Role Playing Games",
//     "Simulation",
//     "Sports",
//     "Soulslike",
//     "Shooting",
//     "Anime",
//     "First person shooter",
//     "Stealth",
//     "Multiplayer",
//     "Metroidvania",
//   ];

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.post("http://localhost:9000/getallproducts", {
//         searchitem: "",
//         page: 1,
//         limit: 100,
//       });
//       // await delay(2000);  // <-- artificial 2 second delay

//       const allProducts = res.data.data;
//       console.log("first".allProducts);
//       setProducts(allProducts); // ✅ FIXED: now included in context

//       setLatestReleases([...allProducts].slice(0, 6));

//       setOurBestSellers(
//         [...allProducts].sort(
//           (a, b) => (b.sold_count || 0) - (a.sold_count || 0)
//         )
//       );

//       setCriticallyAcclaimed(
//         allProducts.filter((product) => product.rating >= 4.5).slice(0, 6)
//       );

//       setBestStoryMode(
//         allProducts
//           .filter((product) =>
//             product.category_names?.includes("Best Story Mode")
//           )
//           .slice(0, 6)
//       );

//       setActionAdventure(
//         allProducts
//           .filter((product) =>
//             product.category_names?.some((cat) =>
//               ["Action", "Adventure"].includes(cat)
//             )
//           )
//           .slice(0, 6)
//       );

//       setOurRecommendations(
//         allProducts
//           .filter(
//             (product) =>
//               product.recommended === true || product.recommended === 1
//           )
//           .slice(0, 6)
//       );

//       const categoryMap = {};
//       definedCategories.forEach((cat) => {
//         const slug = slugify(cat);
//         categoryMap[slug] = allProducts.filter((product) =>
//           product.category_names?.some(
//             (productCat) => slugify(productCat) === slug
//           )
//         );
//       });

//       setCategoryFilteredProducts(categoryMap);
//       setLoading(false);
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//       setError(error.message || "Failed to fetch products");
//       setLoading(false);
//     }
//   };

//   const fetchProductDetail = async (productId) => {
//     if (productDetailsCache[productId]) {
//       setProductDetail(productDetailsCache[productId]);
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:9000/findbyid", {
//         product_id: [productId],
//       });
//       console.log(response.data);
//       //  await delay(2000);

//       if (response.data?.data?.length > 0) {
//         const product = response.data.data[0];
//         setProductDetail(product);
//         setProductDetailsCache((prev) => ({
//           ...prev,
//           [productId]: product,
//         }));
//       } else {
//         setProductDetail(null);
//       }
//     } catch (error) {
//       console.error("Error fetching product detail:", error);
//       setProductDetail(null);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <ProductContext.Provider
//       value={{
//         products, // ✅ NOW INCLUDED
//         productDetail,
//         fetchProductDetail,
//         latestReleases,
//         ourBestSellers,
//         criticallyAcclaimed,
//         bestStoryMode,
//         actionAdventure,
//         ourRecommendations,
//         categoryFilteredProducts,
//         loading,
//         error,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };




import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [productDetailsCache, setProductDetailsCache] = useState({});
  const [latestReleases, setLatestReleases] = useState([]);
  const [ourBestSellers, setOurBestSellers] = useState([]);
  const [criticallyAcclaimed, setCriticallyAcclaimed] = useState([]);
  const [bestStoryMode, setBestStoryMode] = useState([]);
  const [actionAdventure, setActionAdventure] = useState([]);
  const [ourRecommendations, setOurRecommendations] = useState([]);
  const [categoryFilteredProducts, setCategoryFilteredProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const slugify = (str) => str.toLowerCase().replace(/\s+/g, "-");

const fetchCategories = async () => {
  try {
    const res = await axios.post("http://localhost:8000/getallCategory");
    if (Array.isArray(res.data.data)) {
      // Extract only category_name
      const names = res.data.data.map((cat) => cat.category_name);
      setCategories(names);
    } else {
      console.error("Unexpected category data:", res.data);
    }
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }
};


  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:8000/getallproducts", {
        searchitem: "",
        page: 1,
        limit: 100,
      });

      const allProducts = res.data.data || [];
      setProducts(allProducts);

      setLatestReleases([...allProducts].slice(0, 6));

      setOurBestSellers(
        [...allProducts].sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0))
      );

      setCriticallyAcclaimed(
        allProducts.filter((product) => product.rating >= 4.5).slice(0, 6)
      );

      setBestStoryMode(
        allProducts
          .filter((product) =>
            product.category_names?.includes("Best Story Mode")
          )
          .slice(0, 6)
      );

      setActionAdventure(
        allProducts
          .filter((product) =>
            product.category_names?.some((cat) =>
              ["Action", "Adventure"].includes(cat)
            )
          )
          .slice(0, 6)
      );

      setOurRecommendations(
        allProducts
          .filter(
            (product) =>
              product.recommended === true || product.recommended === 1
          )
          .slice(0, 6)
      );

      const categoryMap = {};
      categories.forEach((cat) => {
        const slug = slugify(cat);
        categoryMap[slug] = allProducts.filter((product) =>
          product.category_names?.some(
            (productCat) => slugify(productCat) === slug
          )
        );
      });

      setCategoryFilteredProducts(categoryMap);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError(error.message || "Failed to fetch products");
      setLoading(false);
    }
  };

  // Fetch product detail
  const fetchProductDetail = async (productId) => {
    if (productDetailsCache[productId]) {
      setProductDetail(productDetailsCache[productId]);
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/findbyid", {
        product_id: [productId],
      });

      if (response.data?.data?.length > 0) {
        const product = response.data.data[0];
        setProductDetail(product);
        setProductDetailsCache((prev) => ({
          ...prev,
          [productId]: product,
        }));
      } else {
        setProductDetail(null);
      }
    } catch (error) {
      console.error("Error fetching product detail:", error);
      setProductDetail(null);
    }
  };

  
  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
    };
    fetchData();
  }, []);

 
  useEffect(() => {
    if (categories.length > 0) {
      fetchProducts();
    }
  }, [categories]);

  return (
    <ProductContext.Provider
      value={{
        products,
        productDetail,
        fetchProductDetail,
        latestReleases,
        ourBestSellers,
        criticallyAcclaimed,
        bestStoryMode,
        actionAdventure,
        ourRecommendations,
        categoryFilteredProducts,
        categories, 
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

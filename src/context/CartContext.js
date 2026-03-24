import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  // const clearCart = () => setCartItems([]); ///mahima
  const [loading, setLoading] = useState(false);
  // const [guestHeaderCart, setGuestHeaderCart] = useState([]);
  const [count, setCount] = useState(
    Number(sessionStorage.getItem("count")) || 0 // Initialize from sessionStorage
  );

  // price
const clearCart = () => {
  setCartItems([]);
  setCount(0); 
  sessionStorage.removeItem("cart"); 
};

   const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getDiscountedTotal = () => {
    const subtotal = getSubtotal();
    return subtotal - (subtotal * discountPercent) / 100;
  };

  const getGSTAmount = () => {
    const total = getDiscountedTotal();
    return total - total / 1.18;
  };

  const handleQuantityChange = async (product_id, delta) => {
    const item = cartItems.find((item) => item.product_id === product_id);
    if (!item) return;

    const newQuantity = item.quantity + delta;

    if (newQuantity < 1) {
      await removeFromCart(product_id);
    } else {
      await addToCart(product_id, delta, item.name, item.image, item.price);
    }
  };

  const applyCoupon = (code) => {
    if (code.toLowerCase() === "discount10") {
      setDiscountPercent(10);
      return { success: true, message: "Coupon applied! 10% discount" };
    }
    setDiscountPercent(0);
    return { success: false, message: "Invalid coupon code" };
  };

  // price

  const Token = sessionStorage.getItem("token");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      if (!token) {
        clearCart(); ////mahima
        setCount(0);
        return;
      }

      const res = await axios.post(
        "http://localhost:8000/getCartDetails",
        {}, // No body for this request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Cart API Response:", res.data);

      if (res.status === 200 && res.data.status) {
        const cartData = res.data.cartDetails || [];
        setCartItems(cartData);
        setCount(cartData.length);
        sessionStorage.setItem("count", cartData.length.toString());
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
      setCartItems([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product_id, quantity = 1, name, image, price) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      const storedCart = JSON.parse(sessionStorage.getItem("guestCart"));
      console.log("llll", storedCart);
      const existingCart = storedCart?.cartData || [];

      const index = existingCart.findIndex(
        (item) => Number(item.product_id) === Number(product_id)
      );

      if (index !== -1) {
        existingCart[index].quantity += quantity;
      } else {
        existingCart.push({
          product_id: product_id,
          name,
          image,
          price,
          quantity,
        });
      }

      sessionStorage.setItem(
        "guestCart",
        JSON.stringify({ cartData: existingCart })
      );

      setCartItems(existingCart); // Set to the array directly

      console.log();
      const totalCount = existingCart.length;
      setCount(totalCount);
      sessionStorage.setItem("count", totalCount.toString()); // Persist in sessionStorage

      console.log("Guest cart updated:", existingCart);
      return { success: true, message: "Added to guest cart" };
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/addToCarts",
        {
          cartData: [{ product_id, quantity }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200 && res.data.status) {
        await fetchCart(); // Refresh cart items and count
        return { success: true, message: res.data.message };
      } else {
        return {
          success: false,
          message: res.data.message || "Failed to add to cart",
        };
      }
    } catch (error) {
      console.error("Error adding to cart", error);
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (product_id) => {
    const token = sessionStorage.getItem("token");

    // Handle guest users
    if (!token) {
      try {
        const storedCart = JSON.parse(sessionStorage.getItem("guestCart")) || {
          cartData: [],
        };
        const updatedCart = storedCart.cartData.filter(
          (item) => Number(item.product_id) !== Number(product_id)
        );

        sessionStorage.setItem(
          "guestCart",
          JSON.stringify({ cartData: updatedCart })
        );
        setCartItems(updatedCart);
        setCount(updatedCart.length);
        sessionStorage.setItem("count", updatedCart.length.toString());

        return { success: true, message: "Item removed from guest cart" };
      } catch (error) {
        console.error("Error removing from guest cart", error);
        return { success: false, message: "Failed to remove item" };
      }
    }

    // Handle logged-in users
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/removeProductFromCart",
        { product_id }, // ✅ Only product_id
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 && res.data.status) {
        setCartItems((prev) =>
          prev.filter((item) => item.product_id !== product_id)
        );
        setCount((prev) => prev - 1);
        return { success: true, message: res.data.message };
      }
      return { success: false, message: res.data.message };
    } catch (error) {
      console.error("Error removing from cart", error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };
  // On initial load, update count from guest cart if not logged in

  useEffect(() => {
    if (!Token) {
      const storedCart = JSON.parse(sessionStorage.getItem("guestCart"));
      const guestCart = storedCart?.cartData || [];
      setCartItems(guestCart); // Initialize with the array
      const guestCount = guestCart.length;
      setCount(guestCount);
      sessionStorage.setItem("count", guestCount.toString());
    } else {
      fetchCart();
    }
  }, [Token]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        fetchCart,
        count,
        addToCart,
        removeFromCart,
        clearCart,
        // 
         getSubtotal,
        getDiscountedTotal,
        getGSTAmount,
        handleQuantityChange,
        discountPercent,
        applyCoupon,
        setDiscountPercent,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

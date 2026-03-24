import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import CategoryPage from "./pages/CategoryPage";
import RegisterForm from "./pages/Register";
import CartPage from "./pages/Cartpage";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import ShopDetails from "./pages/ShopDetails";
import AboutUs from "./pages/AboutUs";
import RefundPolicy from "./pages/RefundPolicy";
import SearchResults from "./components/SearchResult";
import TermsAndConditions from "./pages/TermsAndconditions";
import ScrollToTop from "./ScrollTop";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ScrollToTopButton from "../src/components/scrollTop/ScollTop";
import ForgotPassword from "./pages/Login/ForgetPassword";
import Checkout from "./pages/Checkout/CheckoutPage";
import OrderSuccess from "./pages/Checkout/OrderSuccess";
import Dashboard from "./pages/user/Dashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/shop-details/:id" element={<ShopDetails />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/order-success" element={<OrderSuccess/>}/>
          <Route path="/user-dashboard" element={<Dashboard/>}/>
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar
        />
        <ScrollToTopButton />
      </BrowserRouter>
    </>
  );
}

export default App;

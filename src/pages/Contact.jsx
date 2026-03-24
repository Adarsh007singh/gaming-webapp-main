import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import snowImg from "../assets/img/gaming-img/snow.png";

const Contact = () => {
   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const navigate = useNavigate();

  const contactSubmit = async (e) => {
    e.preventDefault();

    const contactdetails = { name, email, phoneNo, message };

    try {
      const response = await axios.post("http://localhost:8000/contact", contactdetails);

      if (response.status === 200) {
        toast.success(
          "Thank You for your response.We will get back to you soon",
          {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
          }
        );

        // Clear form
        setName("");
        setEmail("");
        setPhoneNo("");
        setMessage("");

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Contact error:", error);
      toast.error(
        error.response?.data?.message || "Contact failed. Please try again.",
        {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
        }
      );
    }
  };
  return (
    <div className="container-fluid checkout-container pt-5 auth-outer">
      <div className="text-center mb-4">
        <h2 className="px-5">
          <span className="px-2">Contact For Any Queries</span>
        </h2>
      </div>

      <div className="row px-xl-5">
        <div className="col-lg-7 mb-5">
          <div className="contact-form">
            <form onSubmit={contactSubmit} className="form-section">
              <div className="control-group mb-3">
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="control-group mb-3">
                <input
                  type="email"
                  className="form-control form-input"
                  placeholder="Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="control-group mb-3">
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Phone No"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>

              <div className="control-group mb-4">
                <textarea
                  className="form-control form-input"
                  rows="6"
                  placeholder="Message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <div>
                <button
                  className="btn btn-gaming-blue py-2 px-4 text-light"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-5 mb-5 summary-section">
          <h5 className="font-weight-semi-bold mb-3 fs-4 section-title">
            Get In Touch
          </h5>
          <p className="text-white">
            Justo sed diam ut sed amet duo amet lorem amet stet sea ipsum, sed
            duo amet et.
          </p>
          <div className="d-flex flex-column mb-3">
            <h5 className="font-weight-semi-bold mb-3 fs-4 section-title">
              Store 1
            </h5>
            <p className="mb-2 text-white">
              <i className="fa fa-map-marker-alt gaming-icon mr-3"></i>
              123 Street, New York, USA
            </p>
            <p className="mb-2 text-white">
              <i className="fa fa-envelope mr-3 gaming-icon"></i>
              info@example.com
            </p>
            <p className="mb-2 text-white">
              <i className="fa fa-phone-alt mr-3 gaming-icon"></i>
              +012 345 67890
            </p>
          </div>

          <div className="d-flex flex-column">
            <h5 className="font-weight-semi-bold mb-3 fs-4 section-title">
              Store 2
            </h5>
            <p className="mb-2 text-white">
              <i className="fa fa-map-marker-alt gaming-icon mr-3"></i>
              123 Street, New York, USA
            </p>
            <p className="mb-2 text-white">
              <i className="fa fa-envelope gaming-icon mr-3"></i>
              info@example.com
            </p>
            <p className="mb-0 text-white">
              <i className="fa fa-phone-alt gaming-icon mr-3"></i>
              +012 345 67890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

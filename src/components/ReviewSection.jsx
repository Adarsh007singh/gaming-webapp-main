import axios from "axios";
import React, { useEffect, useState } from "react";
import { StarRating } from "./StarRating";
import { useProducts } from "../context/ProductContext";
import { toast } from "react-toastify";
const ReviewSection = ({ productId }) => {
  const { productDetail } = useProducts();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [your_opinion, setYour_opinion] = useState("");
  const [rating, setRating] = useState("");
  const [policy, setPolicy] = useState(0);
  const [review, setReview] = useState([]);
  const [permission, setPermission] = useState(0);
  const token = sessionStorage.getItem("token");
  const [reviewcount, setReviewCount] = useState(0);

  const product_id = productId;
  const formData = {
    product_id,
    name,
    email,
    your_opinion,
    rating,
    policy,
    permission,
  };

  const handleReview = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:9000/addProductReview",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status) {
      toast.success(response.data.message || "Review submitted successfully!", {
        position: "bottom-right",
      });

      // 🔄 Re-fetch reviews so new one is shown immediately
      await getReview();

      // ✅ Optionally, clear the form
      setName("");
      setEmail("");
      setYour_opinion("");
      setRating(0);
      setPolicy(false);
      setPermission(false);

    } else {
      toast.error(response.data.message || "Something went wrong.", {
        position: "bottom-right",
      });
    }
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Something went wrong. Please try again.",
      {
        position: "bottom-right",
      }
    );
  }
};


  const getReview = async () => {
    try {
      const reviewResponse = await axios.post(
        "http://localhost:9000/getProductReviews",
        { product_id }
      );
      setReview(reviewResponse.data.data);

      console.log("get Review response", reviewResponse.data.data.length);
      setReviewCount(reviewResponse.data.data.length);
    } catch (error) {
      console.log("review error", error);
    }
  };
  console.log(review);

  useEffect(() => {
    if (product_id) {
      getReview();
    }
  }, [product_id]);

  return (
    <div className="container text-white mt-5 rounded">
      {review.length > 0 ? (
        <>
          <h4 className="mb-4">
            {reviewcount} reviews for {productDetail?.name || "this product"}
          </h4>
          <div className="review-section">{/* You can map reviews here */}</div>
        </>
      ) : (
        <div className="pb-3">
          <h4>Review</h4>
          <p style={{ fontSize: "14px" }}>There are no reviews yet.</p>
        </div>
      )}

      {/* Review 1 */}

      {review.map((item) => {
        return (
          <>
            <div className="pb-3 mb-3" key={item.id}>
              <div className="d-flex align-items-center mb-2 p-3">
                <i className="fa-solid fa-circle-user fs-1 me-2"></i>
                <div className="flex-grow-1">
                  {/* Make this row space-between */}
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                      <strong className="text-uppercase">{item.name} -</strong>
                      <span className="text-white ms-2 review-date ">
                        {new Date(item.created_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="mt-2 mt-md-0 ms-md-3">
                      {Array.from({ length: 5 }, (_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star me-1 ${
                            i < item.rating ? "text-warning" : "text-muted"
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="px-3">{item.your_opinion}</p>
            </div>
            <div className="review-section"></div>
          </>
        );
      })}

      {/* Add a review form */}
      <div className="mt-4">
        <h6>Add a review</h6>
        <small className="text-white">
          Your email address will not be published. Required fields are marked{" "}
          <span className="text-danger">*</span>
        </small>

        <form className="mt-3" onSubmit={handleReview}>
          <div className="mb-3 d-flex align-items-center">
            <label className="form-label d-block me-3">
              YOUR RATING<span className="text-danger">*</span>
            </label>
            <StarRating rating={rating} setRating={setRating} />
          </div>

          <div className="row g-2 mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control bg-transparent"
                placeholder="Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                className="form-control bg-transparent"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <textarea
              className="form-control bg-transparent"
              rows="4"
              placeholder="Your review *"
              value={your_opinion}
              onChange={(e) => setYour_opinion(e.target.value)}
            ></textarea>
          </div>

          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input bg-transparent border-primary"
              id="privacy"
              checked={policy === 1}
              onChange={(e) => setPolicy(e.target.checked ? 1 : 0)}
            />

            <label className="form-check-label" htmlFor="privacy">
              I accept the <a href="#">Privacy Policy</a>
            </label>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input bg-transparent border-primary"
              id="saveinfo"
              checked={permission === 1}
              onChange={(e) => setPermission(e.target.checked ? 1 : 0)}
            />

            <label className="form-check-label" htmlFor="saveinfo">
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, IMG_URL } from "../../../Config/Config";
import Loader from "../Loader/Loader";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const fetchData = async (token) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order response:", response.data);
      setOrders(response.data.orderHistory || []);
      setFetchError(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const renderStatus = (status) => {
    switch (status) {
      case "SUCCESS":
        return <span className="badge bg-success">Success</span>;
      case "PENDING":
        return <span className="badge bg-warning text-dark">Pending</span>;
      case "FAILED":
      case "REJECTED":
        return <span className="badge bg-danger">Rejected</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const parseFinalRate = (rateString) => {
    try {
      const parsed = JSON.parse(rateString);
      return parsed[0]?.finalRate || "0";
    } catch {
      return "0";
    }
  };

   useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer); 
      }, []);
if (loading) return <Loader/>;
  return (
    <div className="container my-5">
      {loading ? (
        <div className="text-center fs-5">Loading your orders...</div>
      ) : fetchError ? (
        <div className="alert alert-danger text-center">
          Failed to fetch orders. Please try again.
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-muted fs-5">No orders found.</div>
      ) : (
        <div className="table-responsive" style={{maxHeight:"550px"}}>
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Course</th>
                <th>Purchase Date</th>
                <th>Status</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.order_id}</strong></td>
                  <td>
                    <div className="d-flex align-items-start gap-2">
                      <img
                        src={`${IMG_URL}/uploads/${order.image}`}
                        alt={order.product_name}
                        width="60"
                        height="60"
                        style={{ objectFit: "cover", borderRadius: "0.25rem" }}
                      />
                      <div>
                        <div className="fw-semibold">{order.product_name}</div>
                        <div className="text-muted small">
                          {order.description?.slice(0, 60)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{formatDate(order.purchase_date)}</td>
                  <td>{renderStatus(order.transaction_status)}</td>
                  <td>₹{parseFinalRate(order.final_rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderPage;

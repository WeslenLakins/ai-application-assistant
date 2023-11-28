import { FaCheckCircle } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentCard = ({ params }) => {
  const { status } = params;
  const navigate = useNavigate();

  return (
    <div className="payment-card">
      {status === "success" ? (
        <div>
          <FaCheckCircle color="#07bc0c" size={100} />
          <div className="payment-desc">
            Your subscription is subscribe successfully!
          </div>
        </div>
      ) : (
        <div>
          <FaWindowClose color="#ff0000" size={100} />
          <div className="payment-desc">
            Something went to wrong, Please try again!
          </div>
        </div>
      )}
      <div>
        <div className="back-flex">
          <button
            className="subscribe-btn btn"
            onClick={() => {
              navigate("/subscription");
              navigate(0);
            }}
          >
            Back to subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;

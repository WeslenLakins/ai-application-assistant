import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { cancelPayment } from "../features/subscription/subscriptionSlice";

const PaymentCard = ({ params }) => {
  const { status, paymentId } = params;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (paymentId) {
        dispatch(cancelPayment({ paymentId }));
      }
    })();
  }, [dispatch, paymentId]);

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
    </div>
  );
};

export default PaymentCard;

import React, { useEffect, useState } from "react";
import {
  getSubscriptionProducts,
  getSubscriptions,
  createSubscription,
  cancelSubscription,
} from "../features/subscription/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import PaymentCard from "../components/PaymentCard";
import SubscriptionCard from "../components/subscriptionCard";

const Subscription = () => {
  const {
    products,
    isLoading,
    isSuccess,
    url,
    isError,
    message,
    subscription,
  } = useSelector((state) => state.subscription);
  const dispatch = useDispatch();
  const [params, setParams] = useState();
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  const handleSubscription = (type, id) => {
    const payload = {
      priceId: id,
      successUrl: `${window.location.href}/?status=success`,
      cancelUrl: `${window.location.href}/?status=cancel`,
    };
    if (type) {
      payload.type = type;
    }
    dispatch(createSubscription(payload));
  };

  const handleCancelSubscription = () => {
    if (!subscription.cancel_at_period_end) {
      dispatch(cancelSubscription({ subscriptionId: subscription.id }));
    }
  };

  useEffect(() => {
    if (Object.keys(subscription).length <= 0) {
      dispatch(getSubscriptions());
    }
  }, [dispatch, subscription]);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    if (params) {
      if (params.get("status")) {
        setParams({
          status: params.get("status"),
          paymentId: params.get("id"),
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    if (isSuccess && Object.keys(subscription).length <= 1) {
      dispatch(getSubscriptionProducts());
    }
  }, [dispatch, isSuccess, subscription]);

  useEffect(() => {
    if (Object.keys(url).length > 0) {
      window.open(url.url, "_self");
    }
  }, [url]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="inner-header flex">
        <h2>Manage subscription</h2>
        {params ? (
          <PaymentCard params={params} />
        ) : Object.keys(subscription).length > 1 ? (
          <SubscriptionCard
            subscription={subscription}
            handleCancel={handleCancelSubscription}
            togglePopup={togglePopup}
          />
        ) : (
          <>
            {products.map((product) => (
              <SubscriptionCard
                product={product}
                handleOnClick={handleSubscription}
                togglePopup={togglePopup}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Subscription;

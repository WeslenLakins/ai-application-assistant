import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "../features/subscription/subscriptionSlice";

export const useJobAllowStatus = () => {
  const [isAllow, setIsAllow] = useState(false);
  const [checking, setIsChecking] = useState(true);

  const { isSuccess, subscription } = useSelector(
    (state) => state.subscription
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      if (Object.keys(subscription).length > 0 && subscription.allowJob) {
        setIsAllow(true);
      }
      setIsChecking(false);
    }
  }, [isSuccess, subscription]);

  return { isAllow, checking };
};

const SubscriptionCard = (props) => {
  const { product, handleOnClick, subscription, handleCancel } = props;

  const formatDate = (unixDate) => {
    const fDate = new Date(unixDate * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = fDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <>
      <h2>Manage subscription</h2>
      <div className="product-card">
        <div className="product-main-flex">
          <div className="product-flex">
            <div className="product-img">
              {((subscription && subscription.product.images.length) > 0 ||
                (product && product.images.length > 0)) && (
                <img
                  src={
                    subscription
                      ? subscription.product.images[0]
                      : product.images[0]
                  }
                  alt=""
                />
              )}
            </div>
            <div className="product-card-flex">
              <div className="left-container-margin">
                <h3 className="pricing-title">
                  {subscription ? subscription.product.name : product.name}
                </h3>
                <div className="pricing-price">
                  $
                  {subscription
                    ? subscription.product.amount / 100
                    : product.price[0].unit_amount / 100}
                </div>
                <div className="product-desc">
                  {subscription
                    ? subscription.product.description
                    : product.description}
                </div>
                {subscription && (
                  <>
                    <div>
                      <b>Status: </b>
                      <span
                        className={`status ${
                          subscription.status === "trialing"
                            ? "trialing"
                            : "active"
                        }`}
                      >
                        {subscription.status}
                      </span>
                    </div>
                    <div>
                      <b>End Date: </b>
                      {formatDate(subscription.current_period_end)}
                    </div>
                  </>
                )}
              </div>
              <div className="left-container v-center">
                <div className="v-center">
                  {subscription ? (
                    <button
                      className={`subscribe-btn mt-20 ${
                        subscription.cancel_at_period_end ? "not-allow" : ""
                      }`}
                      onClick={() => handleCancel()}
                      disabled={subscription.cancel_at_period_end}
                    >
                      {subscription.cancel_at_period_end
                        ? "Cancelled"
                        : "Cancel"}
                    </button>
                  ) : (
                    <>
                      <button
                        className="free-trial-btn"
                        onClick={() =>
                          handleOnClick("trial", product.default_price)
                        }
                      >
                        Free Trial
                      </button>
                      <button
                        className="subscribe-btn mt-20"
                        onClick={() => handleOnClick("", product.default_price)}
                      >
                        Subscribe
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionCard;

const SubscriptionCard = (props) => {
  const { product, handleOnClick, subscription, handleCancel, togglePopup } =
    props;

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

  const Swal = require("sweetalert2");

  const showSweetAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel your subscription!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, Go Back",
      customClass: {
        confirmButton: "btn btn-reverse btn-margin",
        cancelButton: "btn",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        handleCancel();
        togglePopup();
        Swal.fire(
          "Cancelled!",
          "Your subscription has been cancelled.",
          "success"
        );
      }
    });
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
                  {subscription && (
                    <span
                      className={`status ${
                        subscription.status === "trialing"
                          ? "trialing"
                          : "active"
                      }`}
                    >
                      {subscription.status}
                    </span>
                  )}
                </h3>
                <div className="product-desc">
                  {subscription
                    ? subscription.product.description
                    : product.description}
                </div>
                <div className="product-price-flex">
                  <div className="pricing-price">
                    $
                    {subscription
                      ? subscription.product.amount / 100
                      : product.price[0].unit_amount / 100}
                  </div>
                  {product ? (
                    <div className="price-year-text">
                      {product.price[0].recurring.interval === "month"
                        ? "/ Monthly"
                        : product.price[0].recurring.interval}
                    </div>
                  ) : (
                    <div className="price-year-text">
                      {subscription.product.interval === "month"
                        ? "/ Monthly"
                        : subscription.product.interval}
                    </div>
                  )}
                </div>
                {subscription && (
                  <div>
                    {subscription.cancel_at_period_end
                      ? "Expire "
                      : subscription.status === "trialing"
                      ? "Expired "
                      : subscription.status === "active"
                      ? "Renew "
                      : "Expired "}
                    {"on " + formatDate(subscription.current_period_end)}
                  </div>
                )}
              </div>
              <div className="left-container v-center">
                <div className="v-center">
                  {subscription ? (
                    <button
                      className={`subscribe-btn btn mt-20 ${
                        subscription.cancel_at_period_end ? "not-allow" : ""
                      }`}
                      onClick={() => showSweetAlert()}
                      disabled={subscription.cancel_at_period_end}
                    >
                      {subscription.cancel_at_period_end
                        ? "Cancelled"
                        : "Cancel"}
                    </button>
                  ) : (
                    <>
                      <button
                        className="free-trial-btn btn btn-reverse"
                        onClick={() =>
                          handleOnClick("trial", product.default_price)
                        }
                      >
                        Free Trial
                      </button>
                      <button
                        className="subscribe-btn btn mt-20"
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

import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  ElementsConsumer,
  CardElement,
} from "@stripe/react-stripe-js";
import Review from "./Review";
import { loadStripe } from "@stripe/stripe-js";

const PaymentForm = (props) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const handleSubmitt = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, PaymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_item: props.checkoutToken.live.line_items,
        customer: {
          firstname: props.shippingData.firstname,
          lastname: props.shippingData.lastName,
          email: props.shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: props.shippingData.address1,
          town_city: props.shippingData.city,
          county_state: props.shippingData.shippingSubdivision,
          postal_zip_code: props.shippingData.zip,
          country: props.shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: props.shippingData.shippingOption },
        payment: {
          gatewat: "stripe",
          stripe: {
            payment_method_id: PaymentMethod.id,
          },
        },
      };
      props.onCaptureCheckout(props.checkoutToken.id, orderData);
      props.nextStep();
    }
  };
  return (
    <>
      <Review checkoutToken={props.checkoutToken} />
      <Divider />
      <div>
        <h2 style={{ color: "red" }}>
          This is not a real book store. Do not enter your card details as this
          website is only for training purposes.
        </h2>
      </div>
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {(elements, stripe) => {
            return (
              <form onSubmit={(e) => handleSubmitt(e, elements, stripe)}>
                <CardElement />
                <br /> <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button variant="outlined" onClick={props.backStep}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={stripe}
                    color="primary"
                  >
                    Pay
                    {props.checkoutToken.live.subtotal.formatted_with_symbol}
                  </Button>
                </div>
              </form>
            );
          }}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;

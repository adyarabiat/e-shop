import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CssBaseline,
} from "@material-ui/core";

import useStyles from "./styles";
import PaymentForm from "../PaymentForm";
import Confirmation from "../Confirmation";
import AddressForm from "../AddressForm";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping address", "Payment details"];

const CheckoutForm = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(props.cart.id, {
          type: "cart",
        });

        console.log(token);
        setCheckoutToken(token);
      } catch (error) {
        history.push("/");
      }
    };

    generateToken();
  }, [props.cart]);

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const backStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={props.onCaptureCheckout}
        nextStep={nextStep}
      />
    );
  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => {
              return (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {/* That means if activeSteps equal the steps array which means we finish */}
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default CheckoutForm;

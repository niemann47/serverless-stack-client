import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import config from "../config";
import { Elements, StripeProvider } from "react-stripe-elements";
import { FormGroup } from "react-bootstrap";
import BillingForm from "../components/BillingForm";
import SMTP from "../components/SMTP";
import "./Settings.css";


export default function Settings() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isSMTPLoading, setIsSMTPLoading] = useState(false);
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY));
  }, []);

  function billUser(details) {
    return API.post("notes", "/billing", {
      body: details
    });
  }

  async function handleFormSubmit(storage, { token, error }) {
    if (error) {
      onError(error);
      return;
    }
  
    setIsLoading(true);
  
    try {
      await billUser({
        storage,
        source: token.id
      });
  
      alert("Your card has been charged successfully!");
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function saveSMTP(smtp) {
    return API.put("notes", "/smtp", {body: smtp});
  }

  async function handleSaveSMTP(smtp) {
    setIsSMTPLoading(true);

    try {
      await saveSMTP(smtp)

      alert("SMTP Saved!!");
      history.push("/");
    } catch(e) {
      onError(e);
      setIsSMTPLoading(false);
    }
  }
  
  return (
    <div className="Settings">
      <div className="card">
        <StripeProvider stripe={stripe}>
          <Elements>
            <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
          </Elements>
        </StripeProvider>
      </div>
      <div className="smtp">
        <FormGroup bsSize="large" controlId="smtp">
          <SMTP isLoading={isSMTPLoading} onSubmit={handleSaveSMTP} />
        </FormGroup>
      </div>
    </div>
  );
}
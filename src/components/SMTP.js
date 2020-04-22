import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./SMTP.css";

export default function SMTP({ isLoading, onSubmit, ...props }) {
  const [fields, handleFieldChange] = useFormFields({
    service: "",
    username: "",
    clientId: "",
    clientSecret: "",
    refreshToken: "",
    redirectURL: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return (
      fields.service !== "" &&
      fields.username !== "" &&
      fields.clientId !== "" &&
      fields.clientSecret !== "" &&
      fields.refreshToken !== "" &&
      fields.redirectURL !== ""
    );
  }

  async function handleSubmitClick(event) {
    event.preventDefault();

    setIsProcessing(true);
    onSubmit(fields);
    setIsProcessing(false);
  }

  return (
    <form className="SMTP" onSubmit={handleSubmitClick}>
      <FormGroup bsSize="large" controlId="service">
        <ControlLabel>Service</ControlLabel>
        <FormControl
          type="text"
          value={fields.service}
          onChange={handleFieldChange}
          placeholder="SMTP Service"
        />
      </FormGroup>
      <FormGroup bsSize="large" controlId="username">
        <ControlLabel>Username</ControlLabel>
        <FormControl
          type="text"
          value={fields.username}
          onChange={handleFieldChange}
          placeholder="Username"
        />
      </FormGroup>
      <FormGroup bsSize="large" controlId="clientId">
        <ControlLabel>Client ID</ControlLabel>
        <FormControl
          type="text"
          value={fields.clientId}
          onChange={handleFieldChange}
          placeholder="Client ID"
        />
      </FormGroup>
      <FormGroup bsSize="large" controlId="clientSecret">
        <ControlLabel>Client Secret</ControlLabel>
        <FormControl
          type="text"
          value={fields.clientSecret}
          onChange={handleFieldChange}
          placeholder="Client Secret"
        />
      </FormGroup>
      <FormGroup bsSize="large" controlId="refreshToken">
        <ControlLabel>Refresh Token</ControlLabel>
        <FormControl
          type="text"
          value={fields.refreshToken}
          onChange={handleFieldChange}
          placeholder="Refresh Token"
        />
      </FormGroup>
      <FormGroup bsSize="large" controlId="redirectURL">
        <ControlLabel>Redirect URL</ControlLabel>
        <FormControl
          type="text"
          value={fields.redirectURL}
          onChange={handleFieldChange}
          placeholder="Redirect URL"
        />
      </FormGroup>
      <LoaderButton
        block
        type="submit"
        bsSize="large"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Save
      </LoaderButton>
    </form>
  );
}
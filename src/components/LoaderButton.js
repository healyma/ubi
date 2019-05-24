import React from "react";
import  Button  from "react-bootstrap/Button";
import "./LoaderButton.css";

export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) =>
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <span class="oi oi-reload"></span>}
    {!isLoading ? text : loadingText}
  </Button>;

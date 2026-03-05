import React from "react";

type ButtonVariant = "contained" | "outline" | "text";

interface ButtonProps {
  variant?: ButtonVariant;
  buttonText: string;
  buttonFunction: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  buttonText,
  buttonFunction,
  type = "button",
  disabled = false,
}) => {
  const baseClass =
    "px-4 py-2 rounded-md font-medium transition duration-200 focus:outline-none";

  const variantClass = {
    contained:
      "bg-blue-600 text-white hover:bg-blue-700",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50",
    text:
      "text-blue-600 hover:bg-blue-50",
  };

  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed"
    : "";

  return (
    <button
      type={type}
      onClick={buttonFunction}
      disabled={disabled}
      className={`${baseClass} ${variantClass[variant]} ${disabledClass}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
import React, {
  useState,
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes
} from "react";

interface InputProps {
  name: string;
  placeholder?: string;
  value: string;
  type?: React.HTMLInputTypeAttribute;
  onChangeFun: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlurFun?: (e: FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  value,
  type = "text",
  onChangeFun,
  onBlurFun
}) => {

  return (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeFun}
        onBlur={onBlurFun}
        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-primary"
      />
  );
};

export default Input;
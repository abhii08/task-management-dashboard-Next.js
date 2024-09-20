"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; // Change type to accept event
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button = ({ onClick, children, type = "button", className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ${className}`}
    >
      {children}
    </button>
  );
};

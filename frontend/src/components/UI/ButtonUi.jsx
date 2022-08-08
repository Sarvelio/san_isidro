import React from "react";

export default function ButtonUi({
  type = "submit",
  className = "",
  color="",
  processing,
  children,
  onClick,
  btn,
  minWidth=150,
}) {
  return (
    <button
    style={{ minWidth }}
    className="relative inline-block px-4 py-2 font-medium group"
  >
    <span className={
    `absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-${color} group-hover:-translate-x-0 group-hover:-translate-y-0`}
    ></span>
    <span className={`absolute inset-0 w-full h-full bg-white border-2 border-${color} group-hover:bg-${color}`}></span>
    <span
      className={`relative text-${color} group-hover:text-white`}
      
    >
      {children}
    </span>
  </button>
  );
}

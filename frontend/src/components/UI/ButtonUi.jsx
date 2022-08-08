import React from "react";

export default function ButtonUi({
  type = "submit",
  className = "",
  processing,
  children,
  onClick,
  btn,
  minWidth=150,
  button
}) {
  if (button==="primary") {
    return (
      <button
      style={{ minWidth }}
      className="relative inline-block px-4 py-2 font-medium group"
    >
      <span className={
      `absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-cyan-600 group-hover:-translate-x-0 group-hover:-translate-y-0`}
      ></span>
      <span className={`absolute inset-0 w-full h-full bg-white border-2 border-cyan-600 group-hover:bg-cyan-600`}></span>
      <span
        className={`relative text-cyan-600 group-hover:text-white`}
        
      >
        {children}
      </span>
    </button>) 
  }
  if (button==="secondary") {
    return (
      <button
      style={{ minWidth }}
      className="relative inline-block px-4 py-2 font-medium group"
    >
      <span className={
      `absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-orange-600 group-hover:-translate-x-0 group-hover:-translate-y-0`}
      ></span>
      <span className={`absolute inset-0 w-full h-full bg-white border-2 border-orange-600 group-hover:bg-orange-600`}></span>
      <span
        className={`relative text-orange-600 group-hover:text-white`}
        
      >
        {children}
      </span>
    </button>) 
  }
  
  if (button==="danger") {
    return (
      <button
      style={{ minWidth }}
      className="relative inline-block px-4 py-2 font-medium group"
    >
      <span className={
      `absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-red-600 group-hover:-translate-x-0 group-hover:-translate-y-0`}
      ></span>
      <span className={`absolute inset-0 w-full h-full bg-white border-2 border-red-600 group-hover:bg-red-600`}></span>
      <span
        className={`relative text-red-600 group-hover:text-white`}
        
      >
        {children}
      </span>
    </button>) 
  }
  ;
}

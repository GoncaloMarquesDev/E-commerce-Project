// ToastProvider.tsx
/* import React from 'react'; */
import { ToastContainer, toast } from "react-toastify";

/* import "react-toastify/dist/ReactToastify.css"; */

export function ToastProvider() {
  return <ToastContainer position="top-right" autoClose={3000} />;
}

// Exporta também uma função para usar o toast
export const notifySuccess = (message: string) => {
  toast.success(message);
};

export const notifyError = (message: string) => {
  toast.error(message);
};

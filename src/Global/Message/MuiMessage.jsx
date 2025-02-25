// ToastProvider.js
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MuiMessage = ({ children }) => (
  <>
    {children}
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
);

export const showToast = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  warning: (msg) => toast.warning(msg),
  info: (msg) => toast.info(msg),
};

export default MuiMessage;

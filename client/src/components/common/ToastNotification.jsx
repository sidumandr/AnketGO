import React from 'react';
import { Toast } from 'react-toastify';

const ToastNotification = ({ type, message }) => {
  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  switch (type) {
    case 'success':
      return <Toast {...toastConfig} type="success">{message}</Toast>;
    case 'error':
      return <Toast {...toastConfig} type="error">{message}</Toast>;
    case 'info':
      return <Toast {...toastConfig} type="info">{message}</Toast>;
    case 'warning':
      return <Toast {...toastConfig} type="warning">{message}</Toast>;
    default:
      return <Toast {...toastConfig}>{message}</Toast>;
  }
};

export default ToastNotification; 
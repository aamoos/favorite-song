// utils/swal.js
import Swal from 'sweetalert2';

export const showErrorAlert = (message) => {
  Swal.fire({
    icon: 'error',
    title: '',
    text: message,
  });
};

export const showSuccessAlert = (message) => {
  Swal.fire({
    icon: 'success',
    title: '',
    text: message,
  });
};

export const showInfoAlert = (message) => {
  Swal.fire({
    icon: 'info',
    title: 'Information',
    text: message,
  });
};

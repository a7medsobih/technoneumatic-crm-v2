import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 4000,

        style: {
          borderRadius: "12px",
          fontSize: "14px",
        },

        success: {
          duration: 3000,
        },

        error: {
          duration: 5000,
        },
      }}
    />
  );
}

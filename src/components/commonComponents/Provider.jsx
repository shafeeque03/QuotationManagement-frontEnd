// provider.js
"use client";
import { Provider } from "react-redux";
import store  from '../../redux/Store.jsx';
import { Toaster } from "react-hot-toast";
import { useTokenValidation } from "@/hook/useTokenValidation.js";

export default function Providers({ children }) {
  useTokenValidation();
  return (
    <Provider store={store}>
      <Toaster position="bottom-center" />
      {children}
    </Provider>
  );
}

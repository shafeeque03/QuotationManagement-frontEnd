// provider.js
"use client";
import { Provider } from "react-redux";
import {store}  from '../redux/Store.jsx';
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <Toaster position="bottom-center" />
      {children}
    </Provider>
  );
}

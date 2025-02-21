import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme/theme";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/authContext";

const Root = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AuthProvider> 
            <CartProvider>
              <CssBaseline />
              <App />
            </CartProvider>
          </AuthProvider>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

reportWebVitals();

import "./index.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import store from "./Redux/store";


if (typeof window !== "undefined") {
  localStorage.setItem("chakra-ui-color-mode", "light");
}


const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false, 
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {/* Ensures Light Mode is applied before rendering */}
        <ColorModeScript initialColorMode="light" />
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </StrictMode>
);

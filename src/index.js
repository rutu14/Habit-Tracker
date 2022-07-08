import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";

makeServer();

ReactDOM.render(
  	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider> 
				<Provider store={store}>   
					<App />
				</Provider>
			</ChakraProvider>
		</BrowserRouter>
  	</React.StrictMode>,
  	document.getElementById("root")
);

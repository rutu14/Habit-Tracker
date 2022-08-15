import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App, { theme } from "./App";
import { makeServer } from "./server";
import { ChakraProvider} from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";


makeServer();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={theme}> 
				<Provider store={store}> 
					<App />
				</Provider>
			</ChakraProvider>
		</BrowserRouter>
  	</React.StrictMode>
);

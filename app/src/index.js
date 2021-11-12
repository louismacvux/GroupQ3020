import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

import './index.css';
import '../node_modules/tailwindcss/dist/tailwind.min.css';
import "@fontsource/inter";
import theme from "./js/theme";

import App from './components/App';

ReactDOM.render(
     <React.StrictMode>
          <BrowserRouter>
               <ChakraProvider theme={theme}>
                    <ColorModeScript initialColorMode="system" />
                    <App />
               </ChakraProvider>
          </BrowserRouter>
     </React.StrictMode>,
     document.getElementById('root')
);
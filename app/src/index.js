import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

import './index.css';
import '../node_modules/tailwindcss/dist/tailwind.min.css';
import "@fontsource/inter";
import theme from "./js/theme";

import App from './components/App';

ReactDOM.render(
     <React.StrictMode>
          <HashRouter>
               <ChakraProvider theme={theme}>
                    <ColorModeScript initialColorMode="system" />
                    <App />
               </ChakraProvider>
          </HashRouter>
     </React.StrictMode>,
     document.getElementById('root')
);
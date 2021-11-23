import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import AspectRatioContainer from './components/layouts/AspectRatioContainer';

import './index.css';
import '../node_modules/tailwindcss/dist/tailwind.min.css';
import "@fontsource/inter";
import theme from "./theme/theme";

import App from './components/App';

ReactDOM.render(
     <React.StrictMode>
          <HashRouter>
               <ChakraProvider theme={theme}>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <div className="w-screen h-screen">
                         <AspectRatioContainer aspectRatio={9 / 16} className="p-8">
                              <App />
                         </AspectRatioContainer>
                    </div>
               </ChakraProvider>
          </HashRouter>
     </React.StrictMode>,
     document.getElementById('root')
);
import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react"
import theme from "../js/theme";

import Home from "./pages/Home/Home";
import Steps from "./pages/Steps/Steps";
import Diet from "./pages/Diet/Diet";
import Distance from "./pages/Distance/Distance";
import Sleep from "./pages/Sleep/Sleep";
import User from "./pages/User";
import Settings from "./pages/Settings";
import PrimaryLayout from "./layouts/PrimaryLayout";
import SecondaryLayout from "./layouts/SecondaryLayout";

import AppSettings from "../js/types/AppSettings";
import UserData from "../js/types/UserData";

const appData = {
     user: UserData.generateUserData(),
     settings: new AppSettings(),
}
export const AppContext = createContext(appData);

const App = () => {
     return (
          <ChakraProvider theme={theme}>
               <div id="App" className="w-screen h-screen flex-1 justify-center items-center">
                    <AppContext.Provider value={appData}>
                         <Routes>
                              <Route element={<PrimaryLayout />}>
                                   <Route path="/" element={<Home />} />
                              </Route>
                              <Route element={<SecondaryLayout />}>
                                   <Route path="/steps" element={<Steps />} />
                                   <Route path="/diet" element={<Diet />} />
                                   <Route path="/distance" element={<Distance />} />
                                   <Route path="/sleep" element={<Sleep />} />
                                   <Route path="/user" element={<User />} />
                                   <Route path="/settings" element={<Settings />} />
                              </Route>
                         </Routes>
                    </AppContext.Provider>
               </div>
          </ChakraProvider>
     )
}

export default App
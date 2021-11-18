import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Steps from "./pages/Steps/Steps";
import Diet from "./pages/Diet/Diet";
import Distance from "./pages/Distance/Distance";
import Sleep from "./pages/Sleep/Sleep";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import PrimaryLayout from "./layouts/PrimaryLayout";
import SecondaryLayout from "./layouts/SecondaryLayout";

import AppSettings from "../js/types/AppSettings";
import User from "../js/types/User";

let appData = {
     user: User.generateRandomUser(),
     settings: new AppSettings(),
}
export const AppContext = createContext();

const App = () => {
     const [appDataState, setAppDataState] = useState(appData);
     return (
          <div id="App" className="w-full h-full border">
               <AppContext.Provider value={[appDataState, setAppDataState]}>
                    <Routes>
                         <Route element={<PrimaryLayout />}>
                              <Route path="/" element={<Home />} />
                         </Route>
                         <Route element={<SecondaryLayout />}>
                              <Route path="/steps" element={<Steps />} />
                              <Route path="/diet" element={<Diet />} />
                              <Route path="/distance" element={<Distance />} />
                              <Route path="/sleep" element={<Sleep />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="/settings" element={<Settings />} />
                         </Route>
                    </Routes>
               </AppContext.Provider>
          </div>
     )
}

export default App
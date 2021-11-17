import { useContext } from "react";
import { useColorMode, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import Card from "../layouts/Card/Card";

import { AppContext } from "../App";

const Settings = () => {
     const [settings, setSettings] = useContext(AppContext);
     const { colorMode, toggleColorMode } = useColorMode();

     const handlers = {
          "dark-mode": toggleColorMode
     }

     return (
          <div>
               <Card>
                    <FormControl display="flex" justifyContent="space-between" alignItems="center">
                         <FormLabel htmlFor="dark-mode" mb="0">
                              Dark Mode
                         </FormLabel>
                         <Switch id="dark-mode" defaultIsChecked={colorMode === "dark"} checked={colorMode === "dark"} onChange={handlers["dark-mode"]} />
                    </FormControl>
               </Card>
          </div>
     )
}

export default Settings

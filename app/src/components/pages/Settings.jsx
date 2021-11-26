import { useContext } from "react";
import { useColorMode, FormControl, FormLabel, Switch, Select, SimpleGrid, Divider } from "@chakra-ui/react";
import Card from "../layouts/Card/Card";

import { AppContext } from "../App";
import CardStackLayout from "../layouts/CardStackLayout";
import CardTitle from "../layouts/Card/CardTitle";

const Settings = () => {
     const [settings, setSettings] = useContext(AppContext);
     const { colorMode, toggleColorMode } = useColorMode();

     const handlers = {
          "darkMode": toggleColorMode
     }

     return (
          <CardStackLayout>

               <div className="flex flex-col gap-6">
                    <CardTitle size="md">Appearance</CardTitle>
                    <Divider />
                    <SimpleGrid columns={2} rowGap={8} alignItems={"center"}>

                         <FormLabel htmlFor="darkMode" mb="0">
                              Dark Mode
                         </FormLabel>
                         <Switch id="darkMode" defaultIsChecked={colorMode === "dark"} checked={colorMode === "dark"} onChange={handlers["darkMode"]} textAlign={"right"} />

                    </SimpleGrid>
               </div>


               <div className="flex flex-col gap-6">
                    <CardTitle size="md">Units</CardTitle>
                    <Divider />

                    <SimpleGrid columns={2} rowGap={8} alignContent={"end"} alignItems={"center"}>

                         <FormLabel htmlFor="unitDistance" mb="0" verticalAlign={"middle"}>
                              Distance
                         </FormLabel>
                         <Select id="unitDistance" defaultValue={"kilometres"} w={"full"}>
                              <option value="kilometres">kilometres</option>
                              <option value="miles">miles</option>
                         </Select>

                         <FormLabel htmlFor="unitEnergy" mb="0">
                              Energy
                         </FormLabel>
                         <Select id="unitEnergy" defaultValue={"calories"} w={"full"}>
                              <option value="calories">calories</option>
                              <option value="joules">joules</option>
                         </Select>

                         <FormLabel htmlFor="unitHeight" mb="0">
                              Height
                         </FormLabel>
                         <Select id="unitHeight" defaultValue={"kilometres"} w={"full"}>
                              <option value="centimetres">centimetres</option>
                              <option value="feet/inches">feet/inches</option>
                         </Select>

                         <FormLabel htmlFor="unitWeight" mb="0">
                              Weight
                         </FormLabel>
                         <Select id="unitWeight" defaultValue={"kilograms"} w={"full"}>
                              <option value="kilograms">kilograms</option>
                              <option value="pounds">pounds</option>
                         </Select>

                    </SimpleGrid>
               </div>


          </CardStackLayout>
     )
}

export default Settings

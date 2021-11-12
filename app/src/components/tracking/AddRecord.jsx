import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import Card from "../layouts/Card";
import TimeSelector from "../forms/TimeSelector";

const AddEntry = (props) => {
     return (
          <Card className="flex flex-col gap-6" >
               <div className="flex flex-col gap-3">
                    <TimeSelector />
                    <FormControl id="steps">
                         <FormLabel>Step Count</FormLabel>
                         <Input type="steps" />
                    </FormControl>
               </div>
               <Button colorScheme="teal" variant="solid">
                    Add Steps
               </Button>
          </Card>
     )
}

export default AddEntry;
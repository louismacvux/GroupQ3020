import {
     NumberInput,
     NumberInputField,
     NumberInputStepper,
     NumberIncrementStepper,
     NumberDecrementStepper,
     Select,
     FormControl,
     FormLabel,
} from "@chakra-ui/react"

const TimeSelector = (props) => {
     let currentTime = new Date(Date.now());

     let AmPmOptions = [
          <option value="am" key="1">AM</option>,
          <option value="pm" key="2">PM</option>
     ];
     // If PM, flip order so the appropriate default is shown
     if (currentTime.getHours() >= 11) {
          AmPmOptions.push(AmPmOptions.shift());
     }

     return (
          <div className="flex gap-4 items-end">
               <FormControl id="hour">
                    <FormLabel>Hour</FormLabel>
                    <NumberInput defaultValue={currentTime.getHours() % 12} min={1} max={12}>
                         <NumberInputField />
                         <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                         </NumberInputStepper>
                    </NumberInput>
               </FormControl>
               <FormControl id="minute">
                    <FormLabel>Minute</FormLabel>
                    <NumberInput defaultValue={currentTime.getMinutes()} min={0} max={59}>
                         <NumberInputField />
                         <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                         </NumberInputStepper>
                    </NumberInput>
               </FormControl>
               <FormControl id="hour">
                    <Select>
                         {
                              AmPmOptions
                         }
                    </Select>
               </FormControl>
          </div>
     )
}

export default TimeSelector;
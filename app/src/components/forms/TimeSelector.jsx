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
import { Field } from "formik";

const TimeSelector = (props) => {
     let { name, label } = props;
     return (
          <div className="flex gap-4 items-end">
               <Field name={(name ? name + "-" : "") + "hour"}>
                    {({ field, form }) => (
                         <FormControl id={(name ? name + "-" : "") + "hour"}>
                              <FormLabel>{label} Hour</FormLabel>
                              <NumberInput id={(name ? name + "-" : "") + "hour"} {...field} onChange={val => form.setFieldValue(field.name, val)} isInvalid={Object.keys(form.errors).length > 0} min={1} max={12} >
                                   <NumberInputField />
                                   <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                   </NumberInputStepper>
                              </NumberInput>
                         </FormControl>
                    )}
               </Field>
               <Field name={(name ? name + "-" : "") + "minute"}>
                    {({ field, form }) => (
                         <FormControl id={(name ? name + "-" : "") + "minute"}>
                              <FormLabel>{label} Minute</FormLabel>
                              <NumberInput id={(name ? name + "-" : "") + "minute"} {...field} onChange={val => form.setFieldValue(field.name, val)} isInvalid={Object.keys(form.errors).length > 0} min={0} max={59} >
                                   <NumberInputField />
                                   <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                   </NumberInputStepper>
                              </NumberInput>
                         </FormControl>
                    )}
               </Field>
               <Field name={(name ? name + "-" : "") + "ampm"}>
                    {({ field, form }) => (
                         <FormControl>
                              <Select {...field} id={(name ? name + "-" : "") + "ampm"} isInvalid={Object.keys(form.errors).length > 0}>
                                   <option value="am" key="1">AM</option>,
                                   <option value="pm" key="2">PM</option>
                              </Select>
                         </FormControl>
                    )}
               </Field>
          </div>
     )
}

export default TimeSelector;
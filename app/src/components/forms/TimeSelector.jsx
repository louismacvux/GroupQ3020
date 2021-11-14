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
     return (
          <div className="flex gap-4 items-end">
               <Field name="hour">
                    {({ field, form }) => (
                         <FormControl id="hour">
                              <FormLabel>Hour</FormLabel>
                              <NumberInput id="hour" {...field} onChange={val => form.setFieldValue(field.name, val)} isInvalid={Object.keys(form.errors).length > 0} min={1} max={12} >
                                   <NumberInputField />
                                   <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                   </NumberInputStepper>
                              </NumberInput>
                         </FormControl>
                    )}
               </Field>
               <Field name="minute">
                    {({ field, form }) => (
                         <FormControl id="minute">
                              <FormLabel>Minute</FormLabel>
                              <NumberInput id="minute" {...field} onChange={val => form.setFieldValue(field.name, val)} isInvalid={Object.keys(form.errors).length > 0} min={0} max={59} >
                                   <NumberInputField />
                                   <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                   </NumberInputStepper>
                              </NumberInput>
                         </FormControl>
                    )}
               </Field>
               <Field name="ampm">
                    {({ field, form }) => (
                         <FormControl>
                              <Select {...field} id="ampm" isInvalid={Object.keys(form.errors).length > 0}>
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
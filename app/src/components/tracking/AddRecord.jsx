import { FormControl, FormLabel, Button, NumberInput, NumberInputField, useToast, FormErrorMessage } from "@chakra-ui/react";
import Card from "../layouts/Card/Card";
import TimeSelector from "../forms/TimeSelector";
import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";

const AddEntry = (props) => {
     const { trackingData, refreshTrackingData } = props;

     let initialValues = {
          hour: dayjs().format("h"),
          minute: dayjs().format("m"),
          ampm: dayjs().format("a"),
          recordValue: 0
     };

     let formikProps = {
          initialValues,
          onSubmit: ({ hour, minute, ampm, recordValue }, { resetForm }) => {
               hour = Number(hour);
               minute = Number(minute);
               recordValue = Number(recordValue);

               let time = new Date(Date.now());
               let hourOffset = hour < 12 && ampm === "pm" ? 12 : 0;
               time.setHours(hour + hourOffset);
               time.setMinutes(minute);

               if (recordValue > 0) {
                    trackingData.addRecord(time, recordValue);
                    refreshTrackingData();
                    resetForm();
               }
          },
          validate: ({ hour, minute, ampm }) => {
               let errors = {};
               let currentTime = dayjs();
               hour = Number(hour);
               minute = Number(minute);
               if (hour < 12 && ampm === "pm") {
                    hour += 12;
               }
               if (hour > currentTime.hour() || (hour === currentTime.hour() && minute > currentTime.minute())) {
                    errors.time = "Input time exceeds the current time.";
               }
               return errors;
          },
          validateOnChange: false,
          validateOnBlur: false,
     }

     return (
          <div className="flex flex-col gap-6" >
               <Formik {...formikProps}>
                    {props => {
                         const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;
                         return (
                              <Form>
                                   <div className="flex flex-col gap-8">
                                        <div className="flex flex-col gap-2">
                                             <TimeSelector onChange={handleChange} onBlur={handleBlur} error={errors.time} />
                                             <span className="text-red-300">{errors.time}</span>
                                             <Field name="recordValue">
                                                  {({ field, form }) => (
                                                       <FormControl>
                                                            <FormLabel htmlFor="recordValue">Count</FormLabel>
                                                            <NumberInput id="recordValue" {...field} onChange={(val) => form.setFieldValue(field.name, val)}>
                                                                 <NumberInputField />
                                                            </NumberInput>
                                                       </FormControl>
                                                  )}
                                             </Field>
                                        </div>
                                        <Button type="submit" colorScheme="teal" variant="solid">
                                             Add {trackingData.name}
                                        </Button>
                                   </div>
                              </Form>
                         );
                    }}
               </Formik>
          </div>
     )
}

export default AddEntry;
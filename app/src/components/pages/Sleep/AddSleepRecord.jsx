import { FormControl, FormLabel, Button, NumberInput, NumberInputField } from "@chakra-ui/react";
import TimeSelector from "../../forms/TimeSelector";
import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";

const AddSleepRecord = (props) => {
     const { trackingParameter, refreshTrackingParameter } = props;

     let initialValues = {
          "wake-hour": dayjs().format("h"),
          "wake-minute": dayjs().format("m"),
          "wake-ampm": dayjs().format("a"),
          "sleep-hour": dayjs().format("h"),
          "sleep-minute": dayjs().format("m"),
          "sleep-ampm": dayjs().format("a"),
     };

     let formikProps = {
          initialValues,
          onSubmit: ({ hour, minute, ampm, recordValue, ...rest }, { resetForm }) => {
               console.log(rest);
               hour = Number(hour);
               minute = Number(minute);
               recordValue = Number(recordValue);

               let time = new Date(Date.now());
               let hourOffset = hour < 12 && ampm === "pm" ? 12 : 0;
               time.setHours(hour + hourOffset);
               time.setMinutes(minute);

               if (recordValue > 0) {
                    trackingParameter.records.addRecord({ startTime: time, value: recordValue });
                    refreshTrackingParameter();
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
                                        <div className="flex flex-col gap-4">
                                             <TimeSelector label={"Sleep"} name="sleep" onChange={handleChange} onBlur={handleBlur} error={errors.time} />
                                             <TimeSelector label={"Wake"} name="wake" onChange={handleChange} onBlur={handleBlur} error={errors.time} />
                                             <span className="text-red-300">{errors.time}</span>
                                        </div>
                                        <Button type="submit" variant="solid">
                                             Add {trackingParameter.name}
                                        </Button>
                                   </div>
                              </Form>
                         );
                    }}
               </Formik>
          </div>
     )
}

export default AddSleepRecord;
import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import TextFieldInput from "../inputs/TextFieldInput";
import DateInput from "../inputs/DateInput";

const schema = Yup.object().shape({
    patients: Yup.array()
        .of(
            Yup.object().shape({
                first_name: Yup.string().required("Required"),
                last_: Yup.string().required("Required"),
            })
        )
        .required("Must have Patients"),
});

// Validation on Blur will try to check all the fields with field array, so this wont work for our case

const FormArray = () => {
    return (
        <div>
            <Formik
                initialValues={{
                    patients: [
                        {
                            first_name: "",
                            last_name: "",
                        },
                    ],
                }}
                validationSchema={schema}
                validateOnChange={false}
                validateOnBlur={true}
                onSubmit={(values) =>
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                    }, 500)
                }
                render={({ values }) => (
                    <Form>
                        <FieldArray
                            name="patients"
                            render={(arrayHelpers) => (
                                <div>
                                    {values.patients && values.patients.length > 0 ? (
                                        values.patients.map((patient, index) => (
                                            <div key={index}>
                                                {/* <Field name={`friends.${index}`} /> */}
                                                <Field
                                                    name={`patients.${index}.first_name`}
                                                    component={TextFieldInput}
                                                    type="text"
                                                    placeholder="First Name*"
                                                />
                                                <Field
                                                    name={`patients.${index}.last_name`}
                                                    component={TextFieldInput}
                                                    type="text"
                                                    placeholder="Last Name*"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                >
                                                    -
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <button type="button" onClick={() => arrayHelpers.push("")}>
                                            {/* show this when user has removed all friends from the list */}
                                            Add a Patient
                                        </button>
                                    )}
                                    <div>
                                        <button type="submit">Submit</button>
                                    </div>
                                </div>
                            )}
                        />
                    </Form>
                )}
            />
        </div>
    );
};

export default FormArray;

import React from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import TextFieldInput from "../inputs/TextFieldInput";
import DateInput from "../inputs/DateInput";

const PatientForm = () => {
    const handleSubmit = async (data) => {
        console.log(data);
    };
    return (
        <Formik
            onSubmit={handleSubmit}
            autoComplete="off"
            validateOnChange={false}
            validateOnBlur={true}
            initialValues={{
                first_name: "",
                last_name: "",
                date_of_birth: "",
                contact_language: "",
                phone: "",
                email: "",
                address: "",
                notes: "",
            }}
            validationSchema={yup.object().shape({
                first_name: yup.string().required("Required"),
                last_name: yup.string().required("Required"),
                date_of_birth: yup.string().required("Required"),
                contact_language: yup.string().required("Required"),
                phone: yup.string().required("Required"),
                email: yup.string().email("Invalid email").required("Required"),
                address: yup.string().required("Required"),
                notes: yup.string(),
            })}
        >
            <Form className="patient-form">
                <div className="half-width-field__container">
                    <Field name="first_name" component={TextFieldInput} type="text" placeholder="First Name*" />
                    <Field name="last_name" component={TextFieldInput} type="text" placeholder="Last Name*" />
                    {/* <Field name="date_of_birth" component={TextFieldInput} type="text" placeholder="Date of Birth*" /> */}
                    <Field name="date_of_birth" component={DateInput} />
                    <Field
                        name="contact_language"
                        component={TextFieldInput}
                        type="text"
                        placeholder="Contact Language*"
                    />
                    <Field name="phone" component={TextFieldInput} type="text" placeholder="Phone*" />
                    <Field name="email" component={TextFieldInput} type="email" placeholder="Email*" />
                </div>
                <Field name="address" component={TextFieldInput} type="text" placeholder="Addresss*" />
                <Field name="notes" component={TextFieldInput} type="text" placeholder="Notes/Reason" />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default PatientForm;

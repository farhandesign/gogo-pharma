import React from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import TextFieldInput from "../inputs/TextFieldInput";
import DateInput from "../inputs/DateInput";
import AddressInput from "../inputs/AddressInput";

const PatientForm = ({ formRef, setPatientName }) => {
    const handleSubmit = async (data, { resetForm }) => {
        axios
            .post(`https://formspree.io/f/xnqoyqel`, {
                data,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                // Handle error.
                console.log(error.response);
            });
        resetForm();
    };

    return (
        <div>
            <Formik
                innerRef={formRef}
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
                        <Field
                            name="first_name"
                            component={TextFieldInput}
                            type="text"
                            placeholder="First Name*"
                            onBlur={(e) => {
                                setPatientName((patientName) => ({
                                    ...patientName,
                                    firstName: e.target.value,
                                }));
                            }}
                        />
                        <Field
                            name="last_name"
                            component={TextFieldInput}
                            type="text"
                            placeholder="Last Name*"
                            onBlur={(e) => {
                                setPatientName((patientName) => ({
                                    ...patientName,
                                    lastName: e.target.value,
                                }));
                            }}
                        />
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
                    {/* <AddressInput /> */}
                    <Field name="address" component={AddressInput} type="text" placeholder="Addresss*" />
                    {/* <Field name="address" component={TextFieldInput} type="text" placeholder="Addresss*" /> */}
                    <Field name="notes" component={TextFieldInput} type="text" placeholder="Notes/Reason" />
                </Form>
            </Formik>
        </div>
    );
};

export default PatientForm;

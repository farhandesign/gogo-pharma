import React from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import TextFieldInput from "../inputs/TextFieldInput";
import DateInput from "../inputs/DateInput";
import AddressInput from "../inputs/AddressInput";

const PatientForm = ({ formRef, setOpen, patientId, setPatientId, setPatientName, setSuccessMsg }) => {
    // const formSpree = "https://formspree.io/f/xnqoyqel";

    const handleSubmit = async (data, { resetForm, setFieldValue }) => {
        // Post Req
        if (!patientId) {
            axios
                .post(`${process.env.REACT_APP_API}/api/patients`, {
                    data: {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        date_of_birth: data.date_of_birth,
                        contact_language: data.contact_language,
                        phone: data.phone,
                        email: data.email,
                        address: data.address,
                        notes: data.notes,
                    },
                })
                .then((response) => {
                    console.log(response.data.data);
                    if (response.status === 200) {
                        setPatientId(response.data.data.id);
                        setOpen(false);
                        setSuccessMsg((current) => [...current, "1"]);

                        let fieldValues = response.data.data.attributes;

                        const keys = Object.keys(fieldValues);

                        keys.forEach((key) => {
                            setFieldValue(key, fieldValues[key]);
                        });
                    }
                })
                .catch((error) => {
                    // Handle error.
                    console.log(error);
                    setSuccessMsg("Error");
                });
            resetForm();
        }
        // Edit Req
        if (patientId) {
            axios
                .put(`${process.env.REACT_APP_API}/api/patients/${patientId}`, {
                    data: {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        date_of_birth: data.date_of_birth,
                        contact_language: data.contact_language,
                        phone: data.phone,
                        email: data.email,
                        address: data.address,
                        notes: data.notes,
                    },
                })
                .then((response) => {
                    console.log(response.data.data);
                    if (response.status === 200) {
                        setPatientId(response.data.data.id);
                        setOpen(false);
                    }
                })
                .catch((error) => {
                    // Handle error.
                    console.log(error);
                    setSuccessMsg("Error");
                });
        }
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
                        {/* Show patient Name on Card Header only onBlur to avoid bad state changes */}
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
                    <Field name="address" component={AddressInput} type="text" placeholder="Addresss*" />
                    <Field name="notes" component={TextFieldInput} type="text" placeholder="Notes/Reason" />
                </Form>
            </Formik>
        </div>
    );
};

export default PatientForm;

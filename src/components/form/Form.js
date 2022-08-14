import React, { useState, useRef } from "react";
import Wrapper from "../Wrapper";
import PatientCard from "./PatientCard";

const Form = () => {
    const formRef1 = useRef();
    const formRef2 = useRef();
    const formRef3 = useRef();
    const formRef4 = useRef();
    const formRef5 = useRef();

    const getRef = (index) => {
        if (index === 0) {
            return formRef1;
        }
        if (index === 1) {
            return formRef2;
        }
        if (index === 2) {
            return formRef3;
        }
        if (index === 3) {
            return formRef4;
        }
        if (index === 4) {
            return formRef5;
        }
    };

    const [patients, setPatients] = useState(["1"]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleAddPatient = () => {
        if (patients.length < 5) {
            setPatients((current) => [...current, "1"]);
            setCurrentIndex(currentIndex + 1);
        }
    };

    const removePatient = (index) => {
        setPatients([...patients.slice(0, index), ...patients.slice(index + 1, patients.length)]);
    };

    const handleSubmitOutside = () => {
        if (formRef1.current) {
            formRef1.current.handleSubmit();
        }
        if (formRef2.current) {
            formRef2.current.handleSubmit();
        }
        if (formRef3.current) {
            formRef3.current.handleSubmit();
        }
        if (formRef4.current) {
            formRef4.current.handleSubmit();
        }
        if (formRef5.current) {
            formRef5.current.handleSubmit();
        }
    };

    return (
        <Wrapper>
            <div className="form">
                {patients.map((card, index) => {
                    return (
                        <PatientCard
                            formRef={getRef(index)}
                            key={index}
                            index={index}
                            currentIndex={currentIndex}
                            removePatient={removePatient}
                        />
                    );
                })}

                <button className="add-patient__btn" onClick={handleAddPatient}>
                    + ADD ANOTHER PATIENT
                </button>

                <button className="submit-referrals__btn" type="submit" onClick={() => handleSubmitOutside()}>
                    SEND REFERRALS
                </button>
            </div>
        </Wrapper>
    );
};

export default Form;

import React, { useState } from "react";
import AddressInput from "../inputs/AddressInput";
import Wrapper from "../Wrapper";
import PatientCard from "./PatientCard";

const Form = () => {
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

    return (
        <Wrapper>
            <div className="form">
                {patients.map((card, index) => {
                    return (
                        <PatientCard
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
            </div>
            <AddressInput />
        </Wrapper>
    );
};

export default Form;

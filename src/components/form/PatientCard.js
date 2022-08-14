import React, { useState, useEffect } from "react";
import PatientForm from "./PatientForm";
import ExpandAnimation from "../../animations/ExpandAnimation";

const getColor = (index) => {
    switch (index) {
        case 1:
            return "#2595A5";
        case 2:
            return "#3A719B";
        case 3:
            return "#254B7A";
        case 4:
            return "#142B58";
        default:
            return "#25A575";
    }
};

const PatientCard = ({ formRef, index, currentIndex, removePatient }) => {
    const [open, setOpen] = useState(true);

    const [firstName, setFirstName] = useState("New Referral");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        console.log("Current Index", currentIndex);
        console.log("Index", index);
        if (currentIndex !== index) {
            setOpen(false);
        }
    }, [currentIndex, index]);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="patient-card">
            <div className="patient-card__header">
                <div className="patient-number__indicator" style={{ background: `${getColor(index)}` }}>
                    <h1>{index + 1}</h1>
                </div>
                <div className="patient-name__indicator">
                    <h1>
                        {firstName} {lastName}
                    </h1>
                </div>

                <div className="patient-card__actions-container">
                    <button onClick={() => removePatient(index)}>Delete</button>
                    <button onClick={handleOpen}>^</button>
                </div>
            </div>

            <ExpandAnimation open={open}>
                <PatientForm formRef={formRef} setFirstName={setFirstName} setLastName={setLastName} />
            </ExpandAnimation>
        </div>
    );
};

export default PatientCard;

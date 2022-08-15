import React, { useState, useEffect } from "react";
import PatientForm from "./PatientForm";
import ExpandAnimation from "../../animations/ExpandAnimation";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";

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

const PatientCard = ({ card, formRef, index, removePatient, setSuccessMsg }) => {
    const [open, setOpen] = useState(true);

    const [patientName, setPatientName] = useState({
        firstName: "",
        lastName: "",
    });

    // useEffect(() => {
    //     console.log("Current Index", currentIndex);
    //     console.log("Index", index);
    //     if (currentIndex !== index) {
    //         setOpen(false);
    //     }
    // }, [currentIndex, index]);

    const handleOpen = () => {
        setOpen(!open);
    };

    const scrollToJustAbove = (element, margin = 136) => {
        const elDistanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
        window.scrollTo({ top: `${elDistanceToTop - margin}`, left: 0, behavior: "smooth" });
    };

    useEffect(() => {
        let elem = document.getElementById(card);
        setTimeout(function () {
            scrollToJustAbove(elem);
        }, 300);
    }, [card]);

    return (
        <div className="patient-card" id={card}>
            <div className="patient-card__header">
                <div className="patient-number__indicator" style={{ background: `${getColor(index)}` }}>
                    <h1>{index + 1}</h1>
                </div>

                <div className="patient-name__indicator">
                    <h1>
                        {patientName.firstName !== "" ? patientName.firstName : "New Referral"}{" "}
                        {patientName.firstName !== "" && patientName.lastName}
                    </h1>
                </div>

                <div className="patient-card__actions-container">
                    <button onClick={() => removePatient(card)}>
                        <DeleteIcon fontSize="inherit" color="inherit" />
                    </button>
                    <button onClick={handleOpen}>
                        <KeyboardArrowUpIcon
                            fontSize="inherit"
                            color="inherit"
                            className={open ? "expand-icon" : `expand-icon-rotate`}
                        />
                    </button>
                </div>
            </div>

            <ExpandAnimation open={open}>
                <PatientForm
                    formRef={formRef}
                    card={card}
                    removePatient={removePatient}
                    patientName={patientName}
                    setPatientName={setPatientName}
                    setSuccessMsg={setSuccessMsg}
                />
            </ExpandAnimation>
        </div>
    );
};

export default PatientCard;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper";
import PatientCard from "./PatientCard";

const Form = () => {
    const formRef1 = useRef();
    const formRef2 = useRef();
    const formRef3 = useRef();
    const formRef4 = useRef();
    const formRef5 = useRef();

    // Submit Notifications
    const [notifications, setNotifications] = useState({
        success: [],
        edits: [],
    });

    useEffect(() => {
        if (notifications.success.length > 0 || notifications.edits.length > 0) {
            setTimeout(function () {
                setNotifications({
                    success: [],
                    edits: [],
                });
            }, 5000);
        }
    }, [notifications]);

    const [cards, setCards] = useState({
        card1: true,
        card2: false,
        card3: false,
        card4: false,
        card5: false,
    });

    const [nextToOpen, setNextToOpen] = useState("card2");

    function getObjKey(obj) {
        return Object.keys(obj).find((key) => obj[key] === false);
    }

    // Next Card to Add
    useEffect(() => {
        setNextToOpen(getObjKey(cards));
    }, [cards]);

    // If All Forms Are Submitted Successfully Create a New Card
    useEffect(() => {
        const areTrue = Object.values(cards).reduce((a, item) => (a += item === true), 0);
        if (areTrue === 0) {
            setTimeout(function () {
                setCards((cards) => ({
                    ...cards,
                    card1: true,
                }));
            }, 500);
        }
    }, [cards]);

    const handleAddPatient = () => {
        setCards((cards) => ({
            ...cards,
            [nextToOpen]: true,
        }));
    };

    const removePatient = async (card, patientId) => {
        setCards((cards) => ({
            ...cards,
            [card]: false,
        }));

        if (patientId) {
            axios
                .delete(`${process.env.REACT_APP_API}/api/patients/${patientId}`)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    // All Forms that pass validation will be submitted while the ones that dont will stay behind
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
                <div className="view-all-patients">
                    <Link to="/all-patients" target="_blank" rel="noopener noreferrer">
                        View all patients
                    </Link>
                </div>
                <div className="form-notifications">
                    {notifications && notifications.success.length > 0 && typeof notifications.success === "object" && (
                        <div className="success-msg">
                            Success! You have submitted {notifications.success.length} pending referrals. You will be
                            notified once they've been approved
                        </div>
                    )}

                    {notifications && notifications.edits.length > 0 && typeof notifications.edits === "object" && (
                        <div className="success-msg edit-msg">
                            Success! You have Successfully edited {notifications.edits.length} referrals.
                        </div>
                    )}

                    {notifications.success && typeof notifications.success === "string" && (
                        <div className="success-msg error-msg-notification">
                            Oops! there was an error submitting referral. Please try again
                        </div>
                    )}

                    {notifications.edits && typeof notifications.edits === "string" && (
                        <div className="success-msg error-msg-notification">
                            Oops! there was an error editing referral. Please try again
                        </div>
                    )}
                </div>

                <h1 className="title">Referral Patients</h1>
                <h2 className="sub-title">You can add up to five patients at a time</h2>

                {cards.card1 && (
                    <PatientCard
                        formRef={formRef1}
                        card={"card1"}
                        index={0}
                        removePatient={removePatient}
                        setNotifications={setNotifications}
                    />
                )}
                {cards.card2 && (
                    <PatientCard
                        card={"card2"}
                        formRef={formRef2}
                        index={1}
                        removePatient={removePatient}
                        setNotifications={setNotifications}
                    />
                )}
                {cards.card3 && (
                    <PatientCard
                        card={"card3"}
                        formRef={formRef3}
                        index={2}
                        removePatient={removePatient}
                        setNotifications={setNotifications}
                    />
                )}
                {cards.card4 && (
                    <PatientCard
                        card={"card4"}
                        formRef={formRef4}
                        index={3}
                        removePatient={removePatient}
                        setNotifications={setNotifications}
                    />
                )}
                {cards.card5 && (
                    <PatientCard
                        card={"card5"}
                        formRef={formRef5}
                        index={4}
                        removePatient={removePatient}
                        setNotifications={setNotifications}
                    />
                )}

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

import React, { useState, useEffect } from "react";

const AllPatients = () => {
    const [list, setList] = useState(null);
    useEffect(() => {
        let controller = new AbortController();
        (async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/api/patients`, {
                    signal: controller.signal,
                });
                setList(await response.json());
                controller = null;
            } catch (e) {
                // Handle fetch error
            }
        })();
        return () => controller?.abort();
    }, []);

    return (
        <div className="all-patients-pg" style={{ padding: "32px" }}>
            <h2 style={{ color: "blue" }}>Refresh Page to see any changes or edits</h2>
            {list && list.data.length < 1 && <div style={{ margin: "16px 0px" }}>No Patients Added Yet</div>}
            {list &&
                list.data.length > 0 &&
                list.data.map((patient) => {
                    return (
                        <div key={patient.id} style={{ margin: "40px 60px", fontSize: "12px" }}>
                            <h3 style={{ marginBottom: "16px", textDecoration: "underline" }}>
                                Patient # {patient.id}
                            </h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                <li>
                                    First Name: <strong>{patient.attributes.first_name}</strong>
                                </li>
                                <li>
                                    Last Name: <strong>{patient.attributes.last_name}</strong>
                                </li>
                                <li>
                                    Date of Birth: <strong>{patient.attributes.date_of_birth.slice(0, 10)}</strong>
                                </li>
                                <li>
                                    Contact Language: <strong>{patient.attributes.contact_language}</strong>
                                </li>
                                <li>
                                    Phone: <strong>{patient.attributes.phone}</strong>
                                </li>
                                <li>
                                    Email: <strong>{patient.attributes.email}</strong>
                                </li>
                                <li>
                                    Address: <strong>{patient.attributes.address}</strong>
                                </li>
                                <li>
                                    Notes/Reason: <strong>{patient.attributes.notes}</strong>
                                </li>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default AllPatients;

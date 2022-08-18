import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AllPatients from "./components/AllPatients";

import Form from "./components/form/Form";
import "./styles/index.scss";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Form />
                            </Layout>
                        }
                    />

                    <Route path="/all-patients" element={<AllPatients />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

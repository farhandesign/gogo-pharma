import React from "react";
import MainHeader from "../components/MainHeader";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <MainHeader />
            {children}
        </div>
    );
};

export default Layout;

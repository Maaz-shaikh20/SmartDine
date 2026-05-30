import React from "react";
import Navbar from "../../../components/shared/Navbar";
import "../../../App.css";
import "../../../styles/Portals.css";

const WaiterLayout = ({ children }) => {
  return (
    <div className="waiter-wrapper">
      <Navbar
        roleTag="Waiter Portal"
        customLinks={[{ name: "Tables & Orders", path: "/waiter" }]}
      />

      <main
        className="portal-content"
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}
      >
        {children}
      </main>
    </div>
  );
};

export default WaiterLayout;

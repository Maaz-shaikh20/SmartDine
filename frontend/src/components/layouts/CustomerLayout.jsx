import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import MobileBottomNav from "../shared/MobileBottomNav";

const CustomerLayout = () => {
  return (
    <div className="customer-layout">
      <Navbar />
      <main className="page-content" style={{ paddingBottom: "70px" }}>
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default CustomerLayout;

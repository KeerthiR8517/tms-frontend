import React, { useState } from "react";
import ShipmentGrid from "./ShipmentGrid";
import ShipmentTile from "./ShipmentTile";
import AddShipmentModal from "./AddShipmentModal";
import { getRole, logout as doLogout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [view, setView] = useState("grid");
  const [openAdd, setOpenAdd] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const role = getRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    doLogout();
    navigate("/login");
  };


  
  return (
    <div className="dashboard-container">
      {/* Top Menu Bar */}
      <div className="dashboard-header">
        <div className="header-left">
          <button className="menu-btn" onClick={() => setDrawerOpen(!drawerOpen)}>
            ☰
          </button>
          <h2 className="dashboard-title">Shipments Dashboard</h2>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Sidebar Drawer */}
      <div className={`dashboard-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-item">Home</div>
        <div className="drawer-item">Reports</div>
        <div className="drawer-item">Settings</div>
      </div>

      {/* Action Buttons */}
      <div className="dashboard-actions">
        <button className="primary-btn" onClick={() => setView(view === "grid" ? "tile" : "grid")}>
          Switch to {view === "grid" ? "Tile View" : "Grid View"}
        </button>

        {role === "ADMIN" && (
          <button className="success-btn" onClick={() => setOpenAdd(true)}>
            Add Shipment
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {view === "grid" ? <ShipmentGrid /> : <ShipmentTile />}
      </div>

      {/* Modal */}
      <AddShipmentModal open={openAdd} onClose={() => setOpenAdd(false)} />
    </div>
  );
}

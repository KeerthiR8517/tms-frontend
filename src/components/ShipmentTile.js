import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "../styles/ShipmentTile.css";
import ShipmentDetailsModal from "./ShipmentDetailsModal";
import EditShipmentModal from "./EditShipmentModal";
import { getRole } from "../utils/auth";

const GET_SHIPMENTS = gql`
  query GetShipments {
    shipments(page: 1, size: 20, sortBy: "id", sortOrder: "asc") {
      id
      shipperName
      carrierName
      pickupLocation
      deliveryLocation
      status
      rate
      trackingNumber
    }
  }
`;

export default function ShipmentTile() {
  const { data, loading, error } = useQuery(GET_SHIPMENTS);
  const role = getRole();

  const [selectedShipment, setSelectedShipment] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <p>{error.message}</p>;

  const handleTileClick = (shipment) => {
    setSelectedShipment(shipment);
    setOpenDetails(true);
  };

  const handleEditClick = (shipment) => {
    setSelectedShipment(shipment);
    setOpenEdit(true);
    setActiveDropdown(null); // close dropdown
  };

  const handleDeleteClick = (shipment) => {
    alert(`Delete shipment #${shipment.id} (not wired yet)`);
    setActiveDropdown(null); // close dropdown
  };

  const handleFlagClick = (shipment) => {
    alert(`Flag shipment #${shipment.id} (not wired yet)`);
    setActiveDropdown(null); // close dropdown
  };

  const toggleDropdown = (shipmentId, e) => {
    e.stopPropagation(); // prevent tile click
    setActiveDropdown(activeDropdown === shipmentId ? null : shipmentId);
  };

  return (
    <div className="shipment-grid">
      {data.shipments.map((s) => (
        <div
          key={s.id}
          className="shipment-card"
          onClick={() => handleTileClick(s)}
        >
          {/* Bun button top-right */}
          {role === "ADMIN" && (
            <div className="more-btn-wrapper">
              <button
                className="more-btn"
                onClick={(e) => toggleDropdown(s.id, e)}
              >
                ⋮
              </button>

              {activeDropdown === s.id && (
                <div className="dropdown-menu">
                  <div
                    className="dropdown-item"
                    onClick={(e) => { e.stopPropagation(); handleEditClick(s); }}
                  >
                    ✏️ Edit
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={(e) => { e.stopPropagation(); handleFlagClick(s); }}
                  >
                    🚩 Flag
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(s); }}
                  >
                    🗑️ Delete
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="shipment-id">ID: {s.id}</div>
          <div className="shipment-title">{s.shipperName}</div>
          <div className="shipment-info">
            <span>Status: {s.status}</span>
            <span>₹ {s.rate}</span>
          </div>
        </div>
      ))}

      <ShipmentDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        shipment={selectedShipment}
      />

      <EditShipmentModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        shipment={selectedShipment}
      />
    </div>
  );
}

import React from "react";
import "../styles/ShipmentDetailsModal.css";

export default function ShipmentDetailsModal({ open, onClose, shipment }) {
  if (!open || !shipment) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h3 className="modal-title">Shipment #{shipment.id} Details</h3>
        <div className="modal-content">
          {Object.entries(shipment).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

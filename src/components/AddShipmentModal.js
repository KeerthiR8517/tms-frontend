import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import "../styles/AddShipmentModal.css";

const ADD_SHIPMENT = gql`
  mutation AddShipment(
    $shipperName: String
    $carrierName: String
    $pickupLocation: String
    $deliveryLocation: String
    $trackingNumber: String
    $status: String
    $rate: Float
  ) {
    addShipment(
      shipperName: $shipperName
      carrierName: $carrierName
      pickupLocation: $pickupLocation
      deliveryLocation: $deliveryLocation
      trackingNumber: $trackingNumber
      status: $status
      rate: $rate
    ) {
      id
      shipperName
      status
      rate
    }
  }
`;

export default function AddShipmentModal({ open, onClose }) {
  const [form, setForm] = useState({
    shipperName: "",
    carrierName: "",
    pickupLocation: "",
    deliveryLocation: "",
    trackingNumber: "",
    status: "",
    rate: 0,
  });

  const [addShipment] = useMutation(ADD_SHIPMENT, {
    refetchQueries: ["GetShipments"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "rate" ? parseFloat(value) : value });
  };

  const handleSubmit = async () => {
    try {
      await addShipment({ variables: { ...form } });
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">Add Shipment</h3>

        {["shipperName","carrierName","pickupLocation","deliveryLocation","trackingNumber","status","rate"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            value={form[field]}
            onChange={handleChange}
            className="modal-input"
            type={field === "rate" ? "number" : "text"}
          />
        ))}

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>Cancel</button>
          <button className="modal-btn submit" onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
}

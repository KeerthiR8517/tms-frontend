import React, { useState, useEffect } from "react";
import { gql, useMutation } from '@apollo/client';
import "../styles/EditShipmentModal.css";

const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment($id: ID!, $status: String, $rate: Float) {
    updateShipment(id: $id, status: $status, rate: $rate) {
      id
      status
      rate
    }
  }
`;

export default function EditShipmentModal({ open, onClose, shipment }) {
  const [form, setForm] = useState({ status: "", rate: 0 });
  const [updateShipment] = useMutation(UPDATE_SHIPMENT, {
    refetchQueries: ["GetShipments"],
  });

  useEffect(() => {
    if (shipment) setForm({ status: shipment.status, rate: shipment.rate });
  }, [shipment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "rate" ? parseFloat(value) : value });
  };

  const handleSubmit = async () => {
    try {
      await updateShipment({ variables: { id: shipment.id, ...form } });
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!open || !shipment) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Update Shipment #{shipment.id}</h3>
        <label>
          Status
          <input
            type="text"
            name="status"
            value={form.status}
            onChange={handleChange}
          />
        </label>
        <label>
          Rate
          <input
            type="number"
            name="rate"
            value={form.rate}
            onChange={handleChange}
          />
        </label>
        <div className="modal-actions">
          <button className="update-btn" onClick={handleSubmit}>Update</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

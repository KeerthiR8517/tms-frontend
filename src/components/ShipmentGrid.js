import EditShipmentModal from "./EditShipmentModal";
import { getRole } from "../utils/auth";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "../styles/ShipmentGrid.css";

const GET_SHIPMENTS = gql`
  query GetShipments($page: Int!, $size: Int!) {
    shipments(page: $page, size: $size, sortBy: "createdAt", sortOrder: "asc") {
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

export default function ShipmentGrid() {
  const role = getRole();
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const { data, loading, error } = useQuery(GET_SHIPMENTS, {
    variables: { page, size: pageSize },
    fetchPolicy: "network-only",
  });

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <table className="shipment-table">
        <thead>
          <tr>
  {["ID", "Shipper", "Carrier", "Pickup", "Delivery", "Status", "Rate", "Tracking", "Actions"].map(h => {
      if (h === "Actions" && role !== "ADMIN") return null; // Hide Actions header for non-admins
      return <th key={h}>{h}</th>;
    })}
          </tr>
        </thead>
        <tbody>
          {data.shipments.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.shipperName}</td>
              <td>{s.carrierName}</td>
              <td>{s.pickupLocation}</td>
              <td>{s.deliveryLocation}</td>
              <td>{s.status}</td>
              <td>{s.rate}</td>
              <td>{s.trackingNumber}</td>
              <td>
                {role === "ADMIN" && (
                  <button
                    className="edit-btn"
                    onClick={() => { setSelectedShipment(s); setOpenEdit(true); }}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button 
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button 
          disabled={data.shipments.length < pageSize}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <EditShipmentModal 
        open={openEdit} 
        onClose={() => setOpenEdit(false)} 
        shipment={selectedShipment} 
      />
    </>
  );
}

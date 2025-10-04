import React from "react";
import api from "../api/api";

export default function ApprovalCard({ approval, onDecision }) {
  const decide = async (decision) => {
    try {
      const res = await api.post(`/approvals/${approval.expenseId}/decide`, { decision, comment: decision === 'rejected' ? 'Rejected via app' : 'Approved' });
      onDecision?.(res.data);
      alert("Decision recorded");
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-3">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">Expense #{approval.expenseId}</div>
          <div>From: {approval.createdByName || "Employee"} | Amount: {approval.amount || "—"}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => decide("approved")} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
          <button onClick={() => decide("rejected")} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
        </div>
      </div>
    </div>
  );
}

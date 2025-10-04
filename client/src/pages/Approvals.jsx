import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import ApprovalCard from "../components/ApprovalCard";

async function fetchPending() {
  const res = await api.get("/approvals/pending"); // backend route returns pending approvals for user
  return res.data;
}

export default function Approvals(){
  const { data, isLoading, refetch } = useQuery(["pendingApprovals"], fetchPending);

  if (isLoading) return <div>Loading...</div>;

  const approvals = data || [];

  return (
    <div>
      <h2 className="text-2xl mb-4">Approvals</h2>
      {approvals.length === 0 && <div>No pending approvals</div>}
      <div>
        {approvals.map(a => (
          <ApprovalCard
            key={a._id}
            approval={a}
            onDecision={() => refetch()}
          />
        ))}
      </div>
    </div>
  );
}

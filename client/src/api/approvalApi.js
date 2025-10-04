import API from "./axiosInstance";

// Get all pending approvals for current user (Manager/Admin)
export const getPendingApprovals = async () => {
  const res = await API.get("/approvals/pending");
  return res.data;
};

// Approve or reject an expense
export const decideApproval = async (expenseId, decision, comment) => {
  const res = await API.post(`/approvals/${expenseId}/decide`, {
    decision,
    comment,
  });
  return res.data;
};

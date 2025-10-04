import API from "./axiosInstance";

// Example: get stats like total submitted, approved, rejected
export const getDashboardStats = async () => {
  const res = await API.get("/dashboard");
  return res.data;
};

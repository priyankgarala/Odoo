import API from "./axiosInstance";

// Create new expense
export const createExpense = async (formData) => {
  const res = await API.post("/expenses", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Get all expenses (for dashboard)
export const getExpenses = async () => {
  const res = await API.get("/expenses");
  return res.data;
};

// Get expense details
export const getExpenseById = async (id) => {
  const res = await API.get(`/expenses/${id}`);
  return res.data;
};

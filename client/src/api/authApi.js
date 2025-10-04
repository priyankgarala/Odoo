import API from "./axiosInstance";

export const signup = async (data) => {
  const res = await API.post("/auth/signup", data);
  return res.data;
};

export const login = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

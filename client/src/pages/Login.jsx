import React from "react";
import { useForm } from "react-hook-form";
import api, { setAuthToken } from "../api/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      // expecting { token, user }
      const { token, user } = res.data;
      setAuthToken(token);
      login(token, user);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email")} placeholder="Email" className="w-full border p-2" />
        <input {...register("password")} type="password" placeholder="Password" className="w-full border p-2" />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}

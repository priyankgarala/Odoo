import React from "react";
import { useForm } from "react-hook-form";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup(){
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/signup", data);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Signup (creates company & admin)</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("name")} placeholder="Your name" className="w-full border p-2" />
        <input {...register("email")} placeholder="Email" className="w-full border p-2" />
        <input {...register("password")} placeholder="Password" type="password" className="w-full border p-2" />
        <input {...register("companyName")} placeholder="Company name" className="w-full border p-2" />
        <input {...register("country")} placeholder="Country (e.g. India)" className="w-full border p-2" />
        <button className="w-full bg-green-600 text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
}

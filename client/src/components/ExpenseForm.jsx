import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import api from "../api/api";

export default function ExpenseForm({ onSubmitted }) {
  const { register, handleSubmit, reset } = useForm();
  const [file, setFile] = useState(null);
  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const submit = async (data) => {
    try {
      const form = new FormData();
      form.append("amount", data.amount);
      form.append("currency", data.currency);
      form.append("category", data.category);
      form.append("description", data.description);
      form.append("date", data.date);
      if (file) form.append("receipt", file);

      const res = await api.post("/expenses", form, { headers: { "Content-Type": "multipart/form-data" }});
      reset();
      setFile(null);
      onSubmitted?.(res.data);
      alert("Expense submitted");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Submit failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="bg-white p-6 rounded shadow max-w-xl">
      <div className="grid grid-cols-2 gap-3">
        <input {...register("amount")} placeholder="Amount" className="border p-2" />
        <input {...register("currency")} placeholder="Currency (e.g. USD)" className="border p-2" />
      </div>
      <input {...register("category")} placeholder="Category" className="border p-2 mt-3 w-full" />
      <input {...register("date")} type="date" className="border p-2 mt-3 w-full" />
      <textarea {...register("description")} placeholder="Description" className="border p-2 mt-3 w-full" />
      <div {...getRootProps()} className="border border-dashed p-4 text-center mt-3 cursor-pointer">
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop file here...</p> : <p>{file ? file.name : "Drag & drop receipt or click to upload"}</p>}
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Submit Expense</button>
    </form>
  );
}

import React, { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";

export default function SubmitExpense(){
  const [last, setLast] = useState(null);
  return (
    <div>
      <h2 className="text-2xl mb-4">Submit Expense</h2>
      <ExpenseForm onSubmitted={(e) => setLast(e)} />
      {last && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Last submitted</h3>
          <div>Amount: {last.amountOriginal} {last.currencyOriginal}</div>
          <div>Status: {last.status}</div>
        </div>
      )}
    </div>
  );
}

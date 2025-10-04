import React from "react";

const ExpenseForm = ({
  form,
  onChange,
  onSubmit,
  currencyOptions,
  label = "Submit an Expense",
  note = "Attach receipts and choose a currency. Manager-first approval is applied if enabled in Admin settings.",
}) => (
  <div className="expense-form-card">
    <h2 className="expense-form-title">{label}</h2>
    <div className="expense-form-note">{note}</div>
    <form className="expense-form-horizontal" onSubmit={onSubmit}>
      <div className="expense-form-row">
        <div className="expense-form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={onChange}
            placeholder="0.00"
            required
          />
        </div>
        <div className="expense-form-group">
          <label>Currency</label>
          <select
            name="currency"
            value={form.currency}
            onChange={onChange}
            required
          >
            {currencyOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="expense-form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="expense-form-row">
        <div className="expense-form-group-full">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Taxi from airport to hotel…"
            required
            rows={2}
          />
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}
      >
        <button type="submit" className="expense-form-submit-btn">
          Submit Expense
        </button>
      </div>
    </form>
  </div>
);

export default ExpenseForm;

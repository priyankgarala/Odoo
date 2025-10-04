import React from "react";

const getStatusColor = (status) => {
  if (status === "Approved") return "#2fc14d";
  if (status === "Pending") return "#eab308";
  if (status === "Rejected") return "#ed4956";
  return "#9ca3af";
};

const ExpenseTable = ({ expenses }) => {
  if (!expenses.length) return <p>No expenses found.</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead style={{ backgroundColor: "#4c5de8", color: "white" }}>
        <tr>
          <th style={{ padding: "16px 22px", textAlign: "left" }}>Date</th>
          <th style={{ padding: "16px 22px", textAlign: "left" }}>Amount</th>
          <th style={{ padding: "16px 22px", textAlign: "left" }}>Category</th>
          <th style={{ padding: "16px 22px", textAlign: "left" }}>
            Description
          </th>
          <th style={{ padding: "16px 22px", textAlign: "left" }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(
          ({ id, date, amount, currency, category, description, status }) => (
            <tr key={id} style={{ borderBottom: "1px solid #e1e6f4" }}>
              <td style={{ padding: "16px 22px" }}>{date}</td>
              <td style={{ padding: "16px 22px" }}>
                {amount} {currency}
              </td>
              <td style={{ padding: "16px 22px" }}>{category}</td>
              <td style={{ padding: "16px 22px" }}>{description}</td>
              <td>
                <span
                  style={{
                    padding: "6px 18px",
                    borderRadius: "20px",
                    fontWeight: 700,
                    fontSize: "0.93rem",
                    color: "white",
                    backgroundColor: getStatusColor(status),
                    minWidth: "80px",
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
                  {status}
                </span>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default ExpenseTable;

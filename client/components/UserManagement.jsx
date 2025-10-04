import React, { useState } from "react";

const roles = ["Employee", "Manager"];

export default function UserManagement({ users, setUsers }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "Employee",
    managerId: null,
  });
  const [filterRole, setFilterRole] = useState("all");

  // Filtered users based on selected filterRole
  const filteredUsers =
    filterRole === "all" ? users : users.filter((u) => u.role === filterRole);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value === "null" ? null : value,
    }));
  };

  const addUser = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Please enter a user name.");
      return;
    }
    const newUser = {
      id: `u${users.length + 1}`,
      name: form.name.trim(),
      role: form.role,
      managerId: form.role === "Employee" ? form.managerId : null,
    };
    setUsers([...users, newUser]);
    setForm({ name: "", role: "Employee", managerId: null });
    setShowCreateForm(false);
  };

  return (
    <div className="table-card" style={{ maxWidth: 700, margin: "auto" }}>
      <div
        className="table-card-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>User Management</h3>
        <button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? "Cancel" : "Create New User"}
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={addUser} style={{ marginBottom: 24 }}>
          <input
            type="text"
            name="name"
            placeholder="User name"
            value={form.name}
            onChange={handleFormChange}
            style={{ marginRight: 10, padding: "6px 10px", width: "40%" }}
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleFormChange}
            style={{ marginRight: 10, padding: "6px 10px" }}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {form.role === "Employee" && (
            <select
              name="managerId"
              value={form.managerId || "null"}
              onChange={handleFormChange}
              style={{ marginRight: 10, padding: "6px 10px" }}
            >
              <option value="null">Select Manager</option>
              {users
                .filter((u) => u.role === "Manager")
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
            </select>
          )}
          <button type="submit" style={{ padding: "6px 16px" }}>
            Add User
          </button>
        </form>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="filterRole" style={{ marginRight: 12 }}>
          Filter Users by Role:
        </label>
        <select
          id="filterRole"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{ padding: "6px 10px" }}
        >
          <option value="all">All</option>
          <option value="Manager">Managers</option>
          <option value="Employee">Employees</option>
        </select>
      </div>

      <table className="table" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "Employee"
                    ? users.find((m) => m.id === user.managerId)?.name ||
                      "No manager"
                    : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

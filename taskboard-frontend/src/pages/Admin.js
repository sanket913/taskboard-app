import { useEffect, useState } from "react";
import { getAllTasks, getUsers, deleteTask, updateUserRole, deleteUser } from "../services/api";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("tasks");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const loadData = async () => {
    const t = await getAllTasks();
    const u = await getUsers();
    setTasks(t);
    setUsers(u);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await deleteTask(id);
    loadData();
  };

  const handleRoleChange = async (user, role) => {
    await updateUserRole(user.id, role);
    loadData();
  };

  const handleUserDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await deleteUser(id);
    loadData();
  };

  // FILTER
  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  //PAGINATION
  const paginate = (data) => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  };

  const currentData = activeTab === "tasks"
    ? paginate(filteredTasks)
    : paginate(filteredUsers);

  const totalPages = Math.ceil(
    (activeTab === "tasks" ? filteredTasks.length : filteredUsers.length) / pageSize
  );

  const getStatusColor = (status) => {
    if (status === "Done") return "#16a34a";
    if (status === "InProgress") return "#2563eb";
    return "#f59e0b";
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <h2>ADMIN DASHBOARD</h2>

        {/* TABS */}
        <div style={{ marginBottom: "15px" }}>
          <button
            className={activeTab === "tasks" ? "primary" : ""}
            onClick={() => { setActiveTab("tasks"); setPage(1); }}
          >
            Tasks
          </button>

          <button
            className={activeTab === "users" ? "primary" : ""}
            onClick={() => { setActiveTab("users"); setPage(1); }}
            style={{ marginLeft: "10px" }}
          >
            Users
          </button>
        </div>

        {/* SEARCH */}
        <input
          placeholder={`Search ${activeTab}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ================= TASKS ================= */}
        {activeTab === "tasks" && (
          <div className="fade">
            <table style={{ width: "100%", borderSpacing: "0 10px" }}>
              <thead>
                <tr>
                  <th align="left">Title</th>
                  <th align="left">Status</th>
                  <th align="right">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentData.map(t => (
                  <tr key={t.id}>

                    <td>
                      <div className="card">
                        <b>{t.title}</b>
                      </div>
                    </td>

                    <td>
                      <div className="card">
                        <span style={{
                          padding: "5px 10px",
                          borderRadius: "20px",
                          color: "white",
                          background: getStatusColor(t.status)
                        }}>
                          {t.status}
                        </span>
                      </div>
                    </td>

                    <td align="right">
                      <div className="card">
                        <button
                          className="danger"
                          onClick={() => handleDelete(t.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= USERS ================= */}
        {activeTab === "users" && (
          <div className="fade">
            <table style={{ width: "100%", borderSpacing: "0 10px" }}>
              <thead>
                <tr>
                  <th align="left">Email</th>
                  <th align="left">Role</th>
                  <th align="right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentData.map(u => (
                  <tr key={u.id}>

                    <td>
                      <div className="card">
                        {u.email}
                      </div>
                    </td>

                    <td>
                      <div className="card">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u, e.target.value)}
                        >
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
                    </td>

                    <td align="right">
                      <div className="card">
                        <button
                          className="danger"
                          onClick={() => handleUserDelete(u.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {page} / {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>

      </div>
    </>
  );
}
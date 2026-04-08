import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async () => {
    if (!title) return alert("Enter task title");
    await createTask({ title, description: "", status: "ToDo" });
    setTitle("");
    loadTasks();
  };

  const handleUpdate = async (task) => {
    const newTitle = prompt("Enter new title", task.title);
    if (!newTitle) return;

    await updateTask(task.id, {
      title: newTitle,
      description: task.description,
      status: task.status
    });

    loadTasks();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await deleteTask(id);
    loadTasks();
  };

  const filteredTasks = filter
    ? tasks.filter(task => task.status === filter)
    : tasks;

  const getStatusStyle = (status) => {
    if (status === "Done") return { background: "#dcfce7", color: "#16a34a" };
    if (status === "InProgress") return { background: "#dbeafe", color: "#2563eb" };
    return { background: "#fef3c7", color: "#f59e0b" };
  };

  return (
    <>
      <Navbar />

      <div className="container">

        {/* HERO HEADER */}
        <div style={{ marginBottom: "25px" }}>
          <h1 style={{ margin: 0 }}>My Tasks</h1>
          <p style={{ color: "#666" }}>
            Manage your daily workflow 🚀
          </p>
        </div>

        {/* ADD TASK SECTION */}
        <div
          className="card"
          style={{
            marginBottom: "20px",
            borderRadius: "15px",
            background: "linear-gradient(135deg,#eef2ff,#f5f7fb)"
          }}
        >
          <h3>Add New Task</h3>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              value={title}
              placeholder="Enter task title..."
              onChange={e => setTitle(e.target.value)}
            />

            <button className="primary" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>

        {/* FILTER */}
        <div style={{ marginBottom: "15px" }}>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Tasks</option>
            <option value="ToDo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* TASK LIST */}
        {filteredTasks.length === 0 ? (
          <div
            className="card"
            style={{
              textAlign: "center",
              padding: "30px",
              borderRadius: "15px"
            }}
          >
            <h3>No Tasks Yet 🚀</h3>
            <p style={{ color: "#666" }}>
              Start by adding your first task
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "15px"
            }}
          >
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className="card"
                style={{
                  borderRadius: "15px",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.05)";
                }}
              >

                {/* TITLE */}
                <h3 style={{ marginBottom: "10px" }}>
                  {task.title}
                </h3>

                {/* STATUS BADGE */}
                <span
                  style={{
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    ...getStatusStyle(task.status)
                  }}
                >
                  {task.status}
                </span>

                {/* ACTIONS */}
                <div style={{ marginTop: "15px" }}>
                  <button onClick={() => handleUpdate(task)}>
                    Edit
                  </button>

                  <button
                    className="danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* ADMIN BUTTON */}
        {role === "Admin" && (
          <div style={{ marginTop: "25px", textAlign: "center" }}>
            <button
              className="success"
              onClick={() => navigate("/admin")}
            >
              Go to Admin Panel
            </button>
          </div>
        )}

      </div>
    </>
  );
}
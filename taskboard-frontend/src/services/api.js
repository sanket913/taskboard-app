
const BASE_URL = "https://taskboard-app-9ulk.onrender.com/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found. Please login again.");
  }

  return {
    Authorization: "Bearer " + token
  };
};

// COMMON FETCH HANDLER (IMPORTANT)
const handleResponse = async (res) => {
  const text = await res.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  
  if (res.status === 401) {
    console.warn("Unauthorized - token might be invalid");
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(data.message || text || "API Error");
  }

  return data;
};

// ================= AUTH =================

export const login = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return handleResponse(res);
};

export const signup = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return handleResponse(res);
};

// ================= TASKS =================

export const getTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: {
      ...getAuthHeader()
    }
  });

  return handleResponse(res) || [];
};

export const createTask = async (task) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader()
    },
    body: JSON.stringify(task)
  });

  return handleResponse(res);
};

export const updateTask = async (id, data) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader()
    },
    body: JSON.stringify(data)
  });

  return handleResponse(res);
};

export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader()
    }
  });

  return handleResponse(res);
};

// ================= ADMIN =================

export const getAllTasks = async () => {
  const res = await fetch(`${BASE_URL}/admin/tasks`, {
    headers: {
      ...getAuthHeader()
    }
  });

  return handleResponse(res) || [];
};

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/admin/users`, {
    headers: {
      ...getAuthHeader()
    }
  });

  return handleResponse(res) || [];
};

export const updateUserRole = async (id, role) => {
  const res = await fetch(`${BASE_URL}/admin/users/${id}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader()
    },
    body: JSON.stringify({ role })
  });

  return handleResponse(res);
};
export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader()
    }
  });

  return handleResponse(res);
};

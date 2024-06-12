import axios from "axios";

// create an axios instance for api request
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  timeout: 120000,
});

// funtion to create axios instance

const createTodoApi = (title, description) => {
  return apiClient.post(
    "/todos",
    { title, description },
    { headers: { "Content-Type": "application/json" } }
  );
};

const getAllTodos = () => {
  return apiClient.get("/todos");
};

const toggleTodoStatusApi = (todoId) => {
  return apiClient.patch(`/todos/toggle/status/${todoId}`);
};

const deleteTodoApi = (todoId) => {
  return apiClient.delete(`/todos/${todoId}`);
};

const editTodo = (todoId, todoData) => {
  return apiClient.patch(`/todos/${todoId}`, todoData, {
    headers: { "Content-Type": "application/json" },
  });
};

const getFilteredTodoApi = (query, isComplete) => {
  return apiClient.get(
    `/todos?query=${query}${
      isComplete === null ? "" : `&complete=${isComplete}`
    }`
  );
};

export {
  createTodoApi,
  deleteTodoApi,
  editTodo,
  getAllTodos,
  getFilteredTodoApi,
  toggleTodoStatusApi,
};

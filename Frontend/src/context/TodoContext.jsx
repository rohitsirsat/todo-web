import React, { createContext, useContext, useEffect, useState } from "react";
import { TodoInterface } from "../utils/constants.js";
import { requestHandler } from "../utils/requestHandler.js";
import {
  createTodoApi,
  getAllTodos,
  getFilteredTodoApi,
} from "../api/index.js";
import toast from "react-hot-toast";
import Loader from "../components/Loader.jsx";

// create a constext to manage todos

const TodoContext = createContext({
  todos: [new TodoInterface()],
  loading: false,
  createLoading: false,
  fetchLoading: false,
  createTodo: async () => {},
  changeTodo: () => {},
  getFilteredTodos: async () => {},
});

// create a hook to access the todos and related functions
const useTodo = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [createLoading, setCreateLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const createTodo = async (title, description) => {
    await requestHandler(
      async () => await createTodoApi(title, description),
      setCreateLoading,
      (res) => {
        const data = res.data;
        setTodos([data, ...todos]);
        toast.success(res.message);
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  const changeTodo = (_todos) => {
    setTodos(_todos);
  };

  const getFilteredTodos = async (query, isComplete) => {
    await requestHandler(
      async () => await getFilteredTodoApi(query, isComplete),
      setFetchLoading,
      (res) => {
        const { data } = res;
        setTodos(data);
        console.log(data);
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  useEffect(() => {
    // fetching todos on page refresh

    (async () => {
      await requestHandler(
        async () => await getAllTodos(),
        setLoading,
        (res) => {
          const { data } = res;
          setTodos(data);
        },
        (error) => {
          toast.error(error);
        }
      );
    })();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        createLoading,
        createTodo,
        changeTodo,
        loading,
        fetchLoading,
        getFilteredTodos,
      }}
    >
      {loading ? (
        <div className="flex justify-center items-center text-2xl h-[100vh]">
          <Loader />
        </div>
      ) : (
        children
      )}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider, useTodo };

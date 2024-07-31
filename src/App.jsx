import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import { AiFillPlusCircle } from "react-icons/ai";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "https://todo-backend-67vf.onrender.com/alldata"
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(
        "https://todo-backend-67vf.onrender.com/create",
        { title: newTodo, completed: false }
      );
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (_id) => {
    try {
      await axios.post("https://todo-backend-67vf.onrender.com/delete", {
        _id,
      });
      setTodos(todos.filter((todo) => todo._id !== _id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodoTitle = async (_id, title) => {
    try {
      const response = await axios.post(
        "https://todo-backend-67vf.onrender.com/update-title",
        { _id, title, updatedAt: new Date() }
      );
      setTodos(
        todos.map((todo) =>
          todo._id === _id ? { ...todo, title: response.data.title } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo title:", error);
    }
  };

  const toggleTodoCompleted = async (_id, completed) => {
    try {
      const response = await axios.post(
        "https://todo-backend-67vf.onrender.com/update-completed",
        { _id, completed, updatedAt: new Date() }
      );
      setTodos(
        todos.map((todo) =>
          todo._id === _id
            ? { ...todo, completed: response.data.completed }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br		 from-black via-gray-600 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
          Todo List
        </h1>
        <form
          className="flex mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
            className="border rounded-l-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 flex items-center"
          >
            <AiFillPlusCircle size={20} />
            <span className="ml-2">Add</span>
          </button>
        </form>
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          updateTodoTitle={updateTodoTitle}
          toggleTodoCompleted={toggleTodoCompleted}
        />
      </div>
    </div>
  );
};

export default App;

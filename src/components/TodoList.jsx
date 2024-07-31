import { useState } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const TodoList = ({ todos, deleteTodo, updateTodoTitle, toggleTodoCompleted }) => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditText(todo.title);
  };

  const saveEdit = (_id) => {
    updateTodoTitle(_id, editText);
    setEditingTodo(null);
  };

  const handleSubmit = (e, _id) => {
    e.preventDefault();
    saveEdit(_id);
  };

  return (
    <ul>
{      // eslint-disable-next-line react/prop-types
}      {todos.map((todo) => (
        <li key={todo._id} className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded-lg">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodoCompleted(todo._id, !todo.completed)}
            className="mr-2"
          />
          {editingTodo === todo._id ? (
            <form onSubmit={(e) => handleSubmit(e, todo._id)} className="flex-grow flex items-center">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border rounded p-1 flex-grow"
              />
              <button
                type="submit"
                className="text-green-500 hover:text-green-700 ml-2"
              >
                <FaSave size={20} />
              </button>
            </form>
          ) : (
            <span className={`flex-grow ${todo.completed ? "line-through" : ""}`}>
              {todo.title}
            </span>
          )}
          <div className="flex items-center space-x-2">
            {editingTodo !== todo._id && (
              <button
                onClick={() => startEditing(todo)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                <FaEdit size={20} />
              </button>
            )}
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

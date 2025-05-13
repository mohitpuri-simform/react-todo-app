import { useContext } from "react";
import { TodoContext } from "../store/TodoContext";
import { Outlet } from "react-router";

function TodoCount() {
  const context = useContext(TodoContext);
  const { todos } = context;

  return (
    <>
      <nav className="bg-gray-800 p-2 w-full text-white">
        Total Todos: {todos.todos.length}
      </nav>
      <Outlet />
    </>
  );
}

export default TodoCount;

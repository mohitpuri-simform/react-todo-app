import { useContext, useRef } from "react";
import { uid } from "uid";
import { TodoContext } from "../store/TodoContext";
import { getCreatedAt } from "../utils/getCurrentDate";
import RenderTodo from "../components/RenderTodo";

function TodoPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const context = useContext(TodoContext);

  if (!context) return "context cannot be empty";
  const { todos, dispatch } = context;

  function handleAddTodo() {
    if (!inputRef.current) return;
    const text = inputRef.current.value.trim();
    if (!text) {
      return;
    }
    const currentTime = getCreatedAt();

    dispatch({
      type: "ADD_TODO",
      payload: {
        id: uid(),
        task: text,
        isDone: false,
        createdAt: currentTime,
      },
    });
    inputRef.current.value = "";
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a Todo"
          ref={inputRef}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div>
        <p className="text-lg font-semibold mb-2">Your Todos:</p>
        <ul className="space-y-4">
          {todos.todos &&
            todos.todos.map((todo, index) => (
              <RenderTodo index={index} todo={todo} key={todo.id} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoPage;

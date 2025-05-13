import { useContext, useRef, type ChangeEvent } from "react";
import { uid } from "uid";
import { TodoContext } from "../store/TodoContext";
import { getCreatedAt } from "../utils/getCurrentDate";
import RenderTodo from "../components/RenderTodo";

import { useSearchParams } from "react-router";

function TodoPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const context = useContext(TodoContext);

  const { todos, dispatch } = context;

  const filteredTitle = searchParams.get("title")?.toLowerCase() ?? "";

  const filteredTodos = todos.todos.filter((todo) =>
    todo.task.toLowerCase().includes(filteredTitle)
  );

  function handleFilterChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchParams({ title: value });
  }

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
        <input
          type="text"
          placeholder="search the todos by title"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ref={searchInputRef}
          value={filteredTitle}
          onChange={handleFilterChange}
        />
      </div>

      <div>
        <p className="text-lg font-semibold mb-2">Your Todos:</p>
        <ul className="space-y-4">
          {filteredTodos.map((todo, index) => (
            <RenderTodo index={index} todo={todo} key={todo.createdAt} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoPage;

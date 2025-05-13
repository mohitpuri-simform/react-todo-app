import type { Todo } from "../types";
import { useContext, useRef, useState } from "react";
import { TodoContext } from "../store/TodoContext";
import { Link } from "react-router";

interface RenderTodoProps {
  todo: Todo;

  index: number;
}

function RenderTodo({ todo, index }: RenderTodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);
  const context = useContext(TodoContext);

  if (!context) return "context cannot be empty";
  const { dispatch } = context;

  function handleInputBlur() {
    setIsEditing(false);
    dispatch({
      type: "EDIT_TODO",
      payload: {
        id: todo.id,
        task: editRef.current?.value ? editRef.current?.value : todo.task,
      },
    });
  }

  return (
    <>
      <li className="p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50">
        {isEditing ? (
          <input
            className="border-2"
            type="text"
            ref={editRef}
            onBlur={handleInputBlur}
          />
        ) : (
          <p className="font-medium text-gray-700 flex items-center justify-between">
            #{index + 1}: {todo.task}
            <Link
              to={`/todos/${todo.id}`}
              className="border-2 bg-green-500 px-2 py-1 rounded-xl"
            >
              Open
            </Link>
          </p>
        )}
        <p className="text-sm text-gray-500">Created at: {todo.createdAt}</p>
        <p
          className={`text-sm font-semibold ${
            todo.isDone ? "text-green-600" : "text-yellow-600"
          }`}
        >
          Status: {todo.isDone ? "Completed" : "Pending"}
        </p>
        <div className="flex gap-2 mt-1 ml-1">
          <button
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() =>
              dispatch({
                type: "DELETE_TODO",
                payload: { id: todo.id },
              })
            }
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
}

export default RenderTodo;

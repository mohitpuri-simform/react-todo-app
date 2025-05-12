import type { Todo } from "../types";
import { useContext, useRef, useState } from "react";
import { TodoContext } from "../store/TodoContext";

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
      payload: { id: todo.id, task: editRef.current!.value },
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
          <p className="font-medium text-gray-700">
            #{index + 1}: {todo.task}
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
      </li>

      <div className="flex gap-2 mt-1 ml-1">
        <button
          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() =>
            dispatch({
              type: "MARK_AS_DONE",
              payload: { id: todo.id },
            })
          }
        >
          Mark as Done
        </button>
        <button
          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => {
            setIsEditing(true);
            editRef.current?.focus();
          }}
        >
          Edit
        </button>
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
    </>
  );
}

export default RenderTodo;

import { useContext, useRef, useState } from "react";
import { useParams } from "react-router";
import { TodoContext } from "../store/TodoContext";
import type { Todo } from "../types";

type params = {
  id: string;
};

function DisplayTodoItem() {
  const context = useContext(TodoContext);
  const params = useParams<params>();
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);
  if (!context) return;

  const { todos, dispatch } = context;

  if (!context) return "context cannot be empty";
  function handleInputBlur(todo: Todo) {
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
    <div>
      {todos.todos.map((todo, index) => {
        if (todo.id === params.id) {
          return (
            <div
              key={todo.id}
              className="p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50"
            >
              {isEditing ? (
                <input
                  className="border-2"
                  type="text"
                  ref={editRef}
                  onBlur={() => handleInputBlur(todo)}
                />
              ) : (
                <p className="font-medium text-gray-700 flex items-center justify-between">
                  #{index + 1}: {todo.task}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Created at: {todo.createdAt}
              </p>
              <p
                className={`text-sm font-semibold ${
                  todo.isDone ? "text-green-600" : "text-yellow-600"
                }`}
              >
                Status: {todo.isDone ? "Completed" : "Pending"}
              </p>
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
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default DisplayTodoItem;

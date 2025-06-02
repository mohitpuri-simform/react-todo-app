import { useContext, useRef, useState } from "react";
import { useParams } from "react-router";
import { TodoContext } from "../store/TodoContext";
import type { Todo } from "../types";

import ActionButtonWrapper from "../components/ActionButtonWrapper";

type Params = {
  id: string;
};

function DisplayTodoItem() {
  const context = useContext(TodoContext);
  const params = useParams<Params>();
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
  const todo = todos.todos.find((todoItem) => todoItem.id === params.id);
  if (!todo) return;

  return (
    <div>
      <div
        key={todo.id}
        className="p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50"
      >
        {isEditing ? (
          <input
            className="border-2"
            type="text"
            defaultValue={todo.task}
            ref={editRef}
            onBlur={() => handleInputBlur(todo)}
          />
        ) : (
          <p className="font-medium text-gray-700 flex items-center justify-between">
            {todo.task}
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
        <ActionButtonWrapper
          editFn={() => {
            setIsEditing(true);
            editRef.current?.focus();
          }}
          markAsDoneFn={() =>
            dispatch({
              type: "MARK_AS_DONE",
              payload: { id: todo.id },
            })
          }
        />
      </div>
    </div>
  );
}

export default DisplayTodoItem;

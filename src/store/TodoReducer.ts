import { uid } from "uid";
import type { TodoAction, TodoState } from "../types";

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [
          ...state.todos,
          {
            id: uid(),
            task: action.payload.task,
            createdAt: action.payload.createdAt,
            isDone: action.payload.isDone,
          },
        ],
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "MARK_AS_DONE":
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.isDone = true;
          }
          return todo;
        }),
      };
    case "EDIT_TODO":
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.task = action.payload.task;
          }
          return todo;
        }),
      };

    case "FILTER_BY_TITLE":
      return {
        todos: state.todos.filter((todo) => todo.task === action.payload.task),
      };

    default:
      return state;
  }
}

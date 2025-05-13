import type { TodoAction, TodoState } from "../types";
import { createContext, useReducer, type ReactNode } from "react";
import { todoReducer } from "./TodoReducer";

interface TodoProviderProps {
  children: ReactNode;
}

const initialState: TodoState = {
  todos: [],
};

type TodoContextType = {
  todos: TodoState;
  dispatch: React.Dispatch<TodoAction>;
};

export const TodoContext = createContext<TodoContextType>({
  todos: { todos: [] },
  dispatch: () => {},
});

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

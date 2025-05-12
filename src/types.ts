export interface Todo {
  id: string;
  isDone: boolean;
  task: string;
  createdAt: string;
}

export type TodoState = {
  todos: Todo[];
};

export type TodoAction =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "EDIT_TODO"; payload: { id: string; task: string } }
  | { type: "MARK_AS_DONE"; payload: { id: string } }
  | { type: "DELETE_TODO"; payload: { id: string } };

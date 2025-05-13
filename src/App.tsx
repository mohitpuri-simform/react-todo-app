import Router from "./routes/Router";
import { TodoProvider } from "./store/TodoContext";

function App() {
  return (
    <>
      <TodoProvider>
        <Router />
      </TodoProvider>
    </>
  );
}

export default App;

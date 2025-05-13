import { useRoutes } from "react-router";
import { TodoProvider } from "./store/TodoContext";
import { routes } from "./routes/routeConfig";

function App() {
  const router = useRoutes(routes);
  return (
    <>
      <TodoProvider>{router}</TodoProvider>
    </>
  );
}

export default App;

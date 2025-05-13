import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TodoPage from "./pages/TodoPage";
import Layout from "./layout/Layout";
import { TodoProvider } from "./store/TodoContext";
import DisplayTodoItem from "./pages/DisplayTodoItem";
import TodoCount from "./components/TodoCount";

function App() {
  return (
    <>
      <TodoProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="todos" element={<TodoCount />}>
              {/* display todo if no route else displaytodoitem */}
              <Route path="" element={<TodoPage />} />
              <Route path=":id" element={<DisplayTodoItem />} />
            </Route>
          </Route>
        </Routes>
      </TodoProvider>
    </>
  );
}

export default App;

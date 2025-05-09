import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TodoPage from "./pages/TodoPage";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="todos" element={<TodoPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

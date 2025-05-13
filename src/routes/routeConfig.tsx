import TodoCount from "../components/TodoCount";
import Layout from "../layout/Layout";
import AboutPage from "../pages/AboutPage";
import DisplayTodoItem from "../pages/DisplayTodoItem";
import HomePage from "../pages/HomePage";
import TodoPage from "../pages/TodoPage";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "todos",
        element: <TodoCount />,
        children: [
          {
            path: "",
            element: <TodoPage />,
          },
          {
            path: ":id",
            element: <DisplayTodoItem />,
          },
        ],
      },
    ],
  },
];

import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StoreContext, store } from "./data/stores/store.ts";
import App from "./App.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Savings from "./pages/Savings/Savings.tsx";
import Expenses from "./pages/Expenses/Expenses.tsx";
import Budget from "./pages/Budget/Budget.tsx";
import Income from "./pages/Income/Income.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/savings",
        element: <Savings />,
      },
      {
        path: "/expenses",
        element: <Expenses />,
      },
      {
        path: "/incomes",
        element: <Income />,
      },
      {
        path: "/budgets",
        element: <Budget />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
  // </React.StrictMode>,
);

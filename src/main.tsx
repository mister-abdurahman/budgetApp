import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StoreContext, store } from "./data/stores/store.ts";
import App from "./App.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import { Savings } from "./pages/Savings/Savings.tsx";
import { Expenses } from "./pages/Expenses/Expenses.tsx";
import { Budgets } from "./pages/Budget/Budget.tsx";
import { Incomes } from "./pages/Income/Income.tsx";

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
        element: <Incomes />,
      },
      {
        path: "/budgets",
        element: <Budgets />,
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

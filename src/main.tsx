import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StoreContext, store } from "./data/stores/store.ts";
import App from "./App.tsx";
import { Savings } from "./pages/Savings/Savings.tsx";
import Advisor from "./pages/Advisor/Advisor.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "/",
      //   element: <div>dashboard</div>,
      // },
      {
        path: "/savings",
        // element: <Savings />,
        element: <Advisor />,
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

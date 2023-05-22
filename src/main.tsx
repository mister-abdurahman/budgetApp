import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import Upload from './pages/Upload/Upload.tsx'
import { StoreContext, store } from './stores/store.ts'
import Student from './pages/Student/Student.tsx'
import StudentEdit from './pages/Student/StudentEdit.tsx'
import User from './pages/User/User.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/upload",
        element: <Upload />
      },
      {
        path: "/students",
        element: <Student />
      },
      {
        path: "/students/:studentId",
        element: <StudentEdit />
      },
      {
        path: "/users",
        element: <User />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>      
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>,
)

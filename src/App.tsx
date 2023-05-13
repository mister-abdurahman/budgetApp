import { Outlet } from "react-router-dom"
import Home from "./layout/Home/Home"

function App() {
  return (
    <Home>
        <Outlet />
    </Home>
  )
}

export default App
import { Outlet } from "react-router-dom"
import Home from "./layout/Home/Home"
import Authentication from "./layout/Authentication/Authentication"

function App() {
  return (
    <Authentication>
      <Home>
        <Outlet />
      </Home>
    </Authentication>
  )
}

export default App
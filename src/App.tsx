import { Outlet } from "react-router-dom"
import Home from "./layout/Home/Home"
import Authentication from "./layout/Authentication/Authentication"
import { useStore } from "./data/stores/store"
import Alert from "./components/Alert"
import { observer } from "mobx-react-lite"

const App = function () {
  const { commonStore } = useStore()
  const { alertArrays } = commonStore
  return (
    <>
      <div className='fixed top-4 left-1/2 translate-x-[-50%] z-50 space-y-1'>
        {alertArrays.map((x, index) => {
          return <Alert id={x.id!} key={index} message={x.message} type={x.type} />
        })}
      </div>
      <Authentication>
        <Home>
          <Outlet />
        </Home>
      </Authentication>
    </>
  )
}

export default  observer(App)
import { Outlet, useNavigation } from "react-router-dom";
import Home from "./layout/Home/Home";
import Authentication from "./layout/Authentication/Authentication";
// import { useStore } from "./data/stores/store";
import Loader from "./components/Loader/Loader";
import { observer } from "mobx-react-lite";

const App = function () {
  //   const { commonStore } = useStore();
  //   const navigation = useNavigation();

  return (
    <>
      {/* {navigation.state === "loading" ? <Loader /> : ""} */}

      {/* <div className="fixed top-4 left-1/2 translate-x-[-50%] z-[2000] space-y-1"></div> */}
      <Authentication>
        <Home>
          <Outlet />
        </Home>
      </Authentication>
    </>
  );
};

export default observer(App);

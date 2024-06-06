import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      Hello
      <Outlet />
    </div>
  );
}

export default Root;

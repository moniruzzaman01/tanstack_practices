import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      Hello this is root
      <Outlet />
    </div>
  );
}

export default Root;

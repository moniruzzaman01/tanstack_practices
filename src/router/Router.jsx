import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import TanstackTable from "../components/tanstackTable/SimpleTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "table",
        element: <TanstackTable />,
      },
    ],
  },
]);

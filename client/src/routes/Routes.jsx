import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import JobDetails from "../components/JobDetails/JobDetails";
import AddJob from "../pages/AddJob/AddJob";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import UpdateJob from "../components/UpdateJob/UpdateJob";
import PrivateRout from "./PrivateRout";
import MyBids from "../pages/MyBids/MyBids";
import BidRequests from "../pages/BidRequests/BidRequests";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader:()=>fetch(`${import.meta.env.VITE_API_URL}/jobs`)
      },
      {
        path: "job/:id",
        element: (
          <PrivateRout>
            <JobDetails />
          </PrivateRout>
        ),
        loader: ({ params }) => fetch(`http://localhost:9000/job/${params.id}`),
      },
      {
        path: "add-job",
        element: (
          <PrivateRout>
            <AddJob />
          </PrivateRout>
        ),
      },
      {
        path: "my-posted-job",
        element: (
          <PrivateRout>
            <MyPostedJobs />
          </PrivateRout>
        ),
      },
      {
        path: "update-job/:id",
        element: <UpdateJob />,
      },
      {
        path: "my-bids",
        element: (
          <PrivateRout>
            <MyBids />
          </PrivateRout>
        ),
      },
      {
        path: "bid-request",
        element: (
          <PrivateRout>
            <BidRequests />
          </PrivateRout>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;

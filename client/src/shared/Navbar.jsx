import { Link } from "react-router-dom";
import useUsers from "../hooks/useUsers";

const Navbar = () => {
  const { user,logOut } = useUsers();
  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto">
      <div className="flex-1">
        <Link to='/'>
        <div className="flex gap-2 items-center">
          <img className="w-auto h-7" src="" alt="" />
          <span className="font-bold text-2xl">MarketNest</span>
        </div>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-3">
          <Link to='/'>
            <div>Home</div>
          </Link>

          {!user && (
            <Link to='/login'>
              <div>Login</div>
            </Link>
          )}
        </ul>

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full" title={user?.displayName}>
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
              <Link to='/add-job' className="justify-between">Add Job</Link>
              </li>
             <li>
             <Link to='/my-posted-job'>
                My Posted Jobs
              </Link>
             </li>
              <li>
              <Link to='/my-bids'>
                My Bids
              </Link>
              </li>
              <li>
              <Link to='/bid-request'>
                Bid Requests
              </Link>
              </li>
             <li>
             <div className='flex items-center justify-center'>
             <button onClick={logOut} className=" block text-center py-2 text-xl font-bold">
                  Logout
                </button>
             </div>
             </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

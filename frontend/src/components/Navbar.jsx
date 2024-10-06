import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, reset } from "../features/user";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(reset());
    navigate("/login",{replace:true});
  };
  return (
    <nav className="shadow-md">
      <div className="relative container mx-auto p-3">
        <div className="flex items-center justify-between">
          {/* Add a nice logo */}
          <div>
            <div className="text-2xl font-bold">
              <Link to="/">GYAN</Link>
            </div>
          </div>
          <div className="flex space-x-10 items-center ">
            <Link to="/" className="  hover:opacity-50">
              Home
            </Link>
            <Link to="/gyan" className="  hover:opacity-50">
              Gyan
            </Link>
            {user.token && user.role!='USER' && <Link to="/admin/users" className="hover:opacity-50">Users</Link>}
            <Link to="/category" className="  hover:opacity-50">
              Categories
            </Link>
            {!user.token ? (
              <>
                <Link to="/login" className="  hover:opacity-50">
                  Sign In
                </Link>
                <Button>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            ) : (
              <>
              <Link className="hover:opacity-50" to={`${user.role=='ADMIN'?'/admin':'/dashboard'}`}>Dashboard</Link>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

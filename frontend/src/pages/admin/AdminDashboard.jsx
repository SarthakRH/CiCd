import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role!="ADMIN") navigate("/login");
  }, [user]);
  return (
    <section className="mt-4">
      <div className="container mx-auto">
        <div className="flex flex-col space-y-6 md:flex-row md:space-x-20 md:justify-center px-4">
          <div>
            <img src={user.avatar} alt={user.name} className="w-60" />
          </div>
          <div>
            <h1 className="underline text-2xl font-bold text-orange-500">
              Welcome to Admin Dashboard!
            </h1>

            <div className="flex flex-col space-y-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdminDashboard;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user";
import { useLocation, useNavigate } from "react-router-dom";
import UserRecord from "../components/UserRecord";
import Gyans from "./Gyans";
import Button from "../components/Button";

const User = () => {
    const location = useLocation();
    const user = location.state.user
  const USER = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!USER.token) navigate("/login");
  }, [USER]);
  return (
    <section className="mt-4">
      <div className="container mx-auto flex flex-col space-y-8">
        <div className="flex flex-col space-y-6 md:flex-row md:space-x-20 md:justify-center px-4 mb-8">
          <div>
            <img src={user.avatar} alt={user.name} className="w-60" />
          </div>
          <div>
            <div className="flex items-center justify-between space-x-4 mb-4">
            <p className="text-2xl text-center uppercase underline">
              User Details
            </p>
           { USER.role!="USER" && <Button type="button" onClick={()=>navigate('/admin/user/edit',{state:{id:user._id}})}>Edit</Button>}
            </div>
            <div className="flex flex-col space-y-4">
              <UserRecord name="Name" value={user.name} />
              <UserRecord name="Branch" value={user.branch} />
              <UserRecord name="Batch" value={user.yearOfPassing} />
              <UserRecord name="Status" value={user.status} />
              {user.role !== "USER" && (
                <UserRecord name="Role" value={user.role} />
              )}
            </div>
          </div>
        </div>
        <div className="m-2">
          <h2 className="text-orange-500 text-2xl font-bold underline mb-4">
            Allowed Categories
          </h2>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {user.categories.length > 0 ? (
              <>
                {user.categories.map((category) => (
                  <p key={category._id} className="uppercase text-orange-500 font-light border-2 border-orange-500 p-2 w-min">{category.name.toUpperCase()}</p>
                ))}
              </>
            ) : (
              <p>User is not authorized to write a gyan on any category.</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-orange-500 text-2xl font-bold underline mb-4">
            Gyan(s) By the user
          </h2>
          <Gyans url={`http://13.232.88.63:5000/gyan?user=${user._id}`} />
        </div>
      </div>
    </section>
  );
};
export default User;

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectUser } from "../features/user"
import { useNavigate } from "react-router-dom"
import UserRecord from "../components/UserRecord"
import Button from "../components/Button"
import Gyans from "./Gyans"

const UserDashboard = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user.token)
            navigate('/login')
    },[user])
  return (
    <section className="mt-4">
      <div className="container mx-auto flex flex-col space-y-8">
        <div className="flex flex-col space-y-6 md:flex-row md:space-x-20 md:justify-center px-4 mb-8">
          <div>
            <img src={user.avatar} alt={user.name} className="w-60" />
          </div>
          <div>
            <p className="text-2xl text-center uppercase underline mb-4">
              User Details
            </p>
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
            Write a review
          </h2>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {user.categories.length > 0 ? (
              <>
                {user.categories.map((category) => (
                  <Button
                    onClick={() =>
                      navigate("/add", { state: { category, id: user.id } })
                    }
                    key={category._id}
                  >
                    {category.name.toUpperCase()}
                  </Button>
                ))}
              </>
            ) : (
              <p>You are not authorized to write a review on any category.</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-orange-500 text-2xl font-bold underline mb-4">
              Gyan(s) By You
          </h2>
          <Gyans url={`http://13.232.88.63:5000/gyan?user=${user.id}`} />
        </div>
      </div>
    </section>
  );
}
export default UserDashboard
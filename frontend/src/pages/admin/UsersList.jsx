import { selectUser } from "../../features/user";
import { useSelector } from "react-redux";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import UserItem from "../../components/UserItem";
import TableHeader from "../../components/TableHeader";
import axios from 'axios';

const UsersList = () => {
    const user = useSelector(selectUser);
    const [data,setData] = useState([])

    // handle delete
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://13.232.88.63:5000/admin/user/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setData((prev) => {
          return prev.filter((item) => item._id != id);
        });
      } catch (error) {
        alert(error.message);
      }
    };
    const {response,error,loading} = useAxios({
        method:'GET',
        url:'http://13.232.88.63:5000/admin/user',
        headers:{
            Authorization:`Bearer ${user.token}`
        }
    })

    useEffect(()=>{
        if(response!=null){
            setData(response)
        }
    },[response])
    return (
      <section className="m-4">
        <div className="container mx-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="mt-2">
              <div className="flex flex-col">
                <h1 className="underline text-3xl text-center uppercase font-bold text-orange-500">
                  Users
                </h1>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-white border-b">
                          <tr>
                            <TableHeader />
                            <TableHeader text="Name" />
                            <TableHeader text="Branch" />
                            <TableHeader text="Batch" />
                            <TableHeader text="Status" />
                            <TableHeader text="Options" />
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item) => (
                            <UserItem
                              user={item}
                              handleDelete={() => handleDelete(item._id)}
                              key={item._id}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
};
export default UsersList;

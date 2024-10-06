import { useEffect,useState,useMemo } from "react"
import useAxios from "../hooks/useAxios"
import GyanItem from '../components/GyanItem'
import TableHeader from "../components/TableHeader";
import axios from "axios";
import { selectUser } from "../features/user";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Branch from "../components/Branch";

const Gyans = ({url}) => {
    const user = useSelector(selectUser)
    const [searchParams,setSearchParams] = useSearchParams();
    const [data,setData] = useState({})
    const [filterBranch, setFilterBranch] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const newUrl = useMemo(()=>{
        return `http://13.232.88.63:5000/gyan?${searchParams.toString()}`;
    },[searchParams])


   useEffect(() => {
    const getAllGyans = async () => {
      try {
        const query = `&page=${page}&branch=${filterBranch.toString()}`;
        const URL = url || newUrl
        setLoading(true)
        const { data } = await axios.get(URL + query);
        setData(data);
      } catch (err) {
        alert(err.message);
      }finally{
        setLoading(false)
      }
    };

    getAllGyans();
   }, [page,filterBranch]);
  // handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://13.232.88.63:5000/gyan/${id}`, {
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

 
  return (
    <section className="m-4">
      <div className="container mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-2">
            <div className="flex flex-col">
              <h1 className="underline text-3xl text-center uppercase font-bold text-orange-500 mb-4">
                Gyans
              </h1>
              <div>
                {!url && <Branch
                  filterBranch={filterBranch}
                  branches={data.branches ? data.branches : []}
                  setFilterBranch={(branch) => setFilterBranch(branch)}
                />}
              </div>
              <div className="overflow-x-auto mb-10 sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-white border-b">
                        <tr>
                          <TableHeader />
                          <TableHeader text="Name" />
                          <TableHeader text="Branch" />
                          <TableHeader text="Batch" />
                          <TableHeader text="Category" />
                          <TableHeader text="Options" />
                        </tr>
                      </thead>
                      <tbody>
                        {data.gyans.map((item) => (
                          <GyanItem
                            gyan={item}
                            handleDelete={() => handleDelete(item._id)}
                            key={item._id}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Pagination
                page={page}
                limit={data.limit ? data.limit : 0}
                total={data.total ? data.total : 0}
                setPage={(page) => setPage(page)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export default Gyans
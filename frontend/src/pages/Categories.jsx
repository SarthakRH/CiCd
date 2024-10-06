import { useEffect } from "react";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import Category from "../components/CategoryItem";
import axios from 'axios';
import { selectUser } from "../features/user";
import { useSelector } from "react-redux";
import AddCategory from "../components/AddCategory";
import Button from "../components/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Categories = () => {
  const [data, setData] = useState([]);
    const user = useSelector(selectUser);
    const [showForm,setShowForm] = useState(false)
  const { response, loading, error } = useAxios({
    method: "GET",
    url: "http://13.232.88.63:5000/admin/category",
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://13.232.88.63:5000/admin/category/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setData((prev) => {
          return prev.filter((item) => item._id != id)
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (response !== null){
      setData(response);
    }
  }, [response]);

   const toggleForm = () => {
     setShowForm((prev) => !prev);
   };
  return (
    <section className="mt-4">
      <div className="container mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {error && <p>{error.messsage}</p>}
            <div className="flex items-center justify-between mb-10">
              <h1 className="underline text-3xl text-center uppercase font-bold text-orange-500">
                Categories
              </h1>
             {user.role=="ADMIN" && <Button onClick={toggleForm}>
                <AiOutlinePlusCircle className="text-lg" />
              </Button>}
            </div>
            {showForm && user.role=="ADMIN" && <AddCategory setCategory={setData} />}
            <div className="flex flex-col space-y-5 justify-center">
              {data.map((item) => (
                <Category
                  category={item}
                  key={item._id}
                  handleDelete={() => handleDelete(item._id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Categories;

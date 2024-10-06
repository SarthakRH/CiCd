import { useEffect } from "react";
import { useState } from "react";
import useAxios from "../..//hooks/useAxios";
import { selectUser } from "../../features/user";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";
import Button from "../../components/Button";
import AddQuestion from "./AddQuestion";
import axios from "axios";

const CategoryQuestions = () => {
  const user = useSelector(selectUser);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({});

  const { response, loading, error } = useAxios({
    method: "GET",
    url: `http://13.232.88.63:5000/admin/question/${id}`,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  useEffect(() => {
    if (response != null) {
      setData(response);
    }
  }, [response]);

  useEffect(() => {
    if (user.role != "ADMIN") navigate("/");
  }, [user]);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://13.232.88.63:5000/admin/question/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setData((prev) => {
        return {
          ...prev,
          questions: prev.questions.filter((item) => item._id != id),
        };
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
          <div>
            {error && <p>{error.messsage}</p>}
            <div className="flex items-center justify-between mb-10">
              <h1 className="underline text-3xl text-center uppercase font-bold text-orange-500">
                {data.category} Category
              </h1>
              <Button onClick={toggleForm}>
                <AiOutlinePlusCircle className="text-lg" />
              </Button>
            </div>
            {showForm && <AddQuestion categoryId={id} setQuestion={setData} />}

            <div className="flex flex-col space-y-5 justify-center">
              {data.questions &&
                data.questions.map((item) => (
                  <div
                    className="p-2 border-l-4 border-orange-300 hover:border-orange-600 shadow-md  flex items-center justify-between"
                    key={item._id}
                  >
                    <p key={item._id} className="text-lg">
                      {item.question}
                    </p>
                    <p className="text-lg flex space-x-2">
                      <abbr title="delete">
                        <AiFillDelete
                          className="cursor-pointer"
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        />
                      </abbr>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default CategoryQuestions;

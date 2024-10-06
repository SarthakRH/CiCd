import { selectUser } from "../features/user";
import { useSelector } from "react-redux";
import { AiFillDelete, AiOutlineQuestion } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const CategoryItem = ({ category, handleDelete }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  return (
    <div className="p-2 border-l-4 border-orange-300 hover:border-orange-600 shadow-md  flex items-center justify-between">
      <p 
      className="text-lg text-orange-500 cursor-pointer px-2 hover:text-orange-600 hover:font-semibold transition duration-300 ease-in-out"
      onClick={()=>navigate(`/gyan?category=${category._id}`)}
      >
        {category.name.toUpperCase()}
      </p>
      {user.role == "ADMIN" && (
        <p className="text-lg flex space-x-2">
          <abbr title="See all questions">
            <Link to={`/admin/questions/${category._id}`}>
              <AiOutlineQuestion className="cursor-pointer" />
            </Link>
          </abbr>
          <abbr title="delete">
            <AiFillDelete className="cursor-pointer" onClick={handleDelete} />
          </abbr>
        </p>
      )}
    </div>
  );
};
export default CategoryItem;

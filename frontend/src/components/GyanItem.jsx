import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {selectUser} from "../features/user";
import { useSelector } from "react-redux";
import GyanCategory from "./GyanCategory";

const GyanItem = ({ gyan, handleDelete }) => {
    const user = useSelector(selectUser)
  const navigate = useNavigate();
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap">
        <img src={gyan.user.avatar} alt="" className="w-12 rounded-full" />
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {gyan.user.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {gyan.user.branch}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {gyan.user.yearOfPassing}
      </td>
      <td className="text-sm text-gray-900 font-md px-6 py-4 whitespace-nowrap">
        <GyanCategory category={gyan.category.name}/>
      </td>
      <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
        <div className="flex space-x-2 justify-start items-center">
          {(user.id == gyan.user._id || user.role=='ADMIN') &&(
            <>
          <abbr title="Delete">
            <AiFillDelete
              className="cursor-pointer hover:text-orange-500 transition duration-100 ease-in-out"
              onClick={handleDelete}
            />
          </abbr>
          <abbr title="Edit">
            <AiFillEdit
              className="cursor-pointer hover:text-orange-500 transition duration-100 ease-in-out"
              onClick={() =>
                navigate("/gyan/edit", { state: {gyan } })
              }
            />
          </abbr>
            </>
          )}
          <abbr title="View">
            <AiFillEye className="cursor-pointer hover:text-orange-500 transition duration-100 ease-in-out" onClick={()=>navigate(`/gyan/${gyan._id}`,{state:{gyan}})} />
          </abbr>
        </div>
      </td>
    </tr>
  );
};
export default GyanItem;

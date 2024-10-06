import {AiFillDelete,AiFillEdit,AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import UserStatus from './UserStatus';
import { useSelector } from "react-redux";
import { selectUser } from "../features/user";


const UserItem = ({user,handleDelete}) => {
  const USER = useSelector(selectUser)
    const navigate = useNavigate();
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap">
        <img src={user.avatar} alt="" className="w-12 rounded-full" />
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {user.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {user.branch}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {user.yearOfPassing}
      </td>
      <td className="text-sm text-gray-900 font-md px-6 py-4 whitespace-nowrap">
        <UserStatus status={user.status}/>
      </td>
      <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
        <div className="flex space-x-2 justify-start items-center">
          {USER.role=="ADMIN" && <abbr title="Delete">
            <AiFillDelete className="cursor-pointer hover:text-orange-500 transition duration-100 ease-in-out" onClick={handleDelete} />
          </abbr>}
          <abbr title="Edit">
            <AiFillEdit className="cursor-pointer hover:text-orange-500 transition duration-100 ease-in-out" onClick={()=>navigate('/admin/user/edit',{state:{id:user._id}})} />
          </abbr>
          <abbr title="View">
            <AiFillEye 
            className="cursor-pointer hover:text-orange-500 transition duration-100 ease-in-out"
            onClick={()=>{
              console.log('Clicked')
              navigate(`/user/${user._id}`,{state:{user}})
            }}
             />
          </abbr>
        </div>
      </td>
    </tr>
  );
}
export default UserItem
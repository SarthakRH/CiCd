import UserStatus from "./UserStatus";


const UserRecord = ({name,value}) => {
  return (
    <p className="flex space-x-4 items-center">
      <span className="text-orange-500 text-lg font-bold mr-2">{name}:</span>
      {name=='Status'? <UserStatus status={value}/>:<span>{value}</span>}
    </p>
  );
}
export default UserRecord
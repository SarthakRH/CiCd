const UserStatus = ({status}) => {
  const classes = `
     capitalize px-2 py-1 w-min rounded-lg flex items-center justify-center
      ${status == "none" ? "bg-red-300 text-red-600" : null}
      ${status == "interned" ? "bg-blue-300 text-blue-600" : null}
      ${status == "placed" ? "bg-green-300 text-green-600" : null}
      ${status == "others" ? "bg-orange-300 text-orange-600" : null}
     `;
  return <span className={classes}>{status}</span>;
}
export default UserStatus
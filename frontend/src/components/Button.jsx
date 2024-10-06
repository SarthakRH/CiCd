const Button = ({type,full,inverted,onClick,children,className}) => {
    const classes = `p-2 px-6  rounded-lg  ${
      full ? "w-full" : null
    } text-center ${
      inverted
        ? "bg-white text-orange-500 hover:bg-orange-100"
        : "text-white bg-orange-500 hover:bg-orange-600"
    }`;
  return (
    <button type={type || "button"} className={`${classes} ${className}`} onClick={onClick}>
        {children}
    </button>
  )
}
export default Button
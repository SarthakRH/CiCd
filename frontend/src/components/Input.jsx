const Input = ({name,formik,type,labelClasses,inputClasses,nolabel,errorClasses}) => {
    const label = name.charAt(0).toUpperCase() + name.slice(1)
    
  return (
    <div className="flex flex-col">
      {!nolabel && <label htmlFor={name} className={labelClasses || "mb-1 text-white text-lg font-semibold"}>
        {label}
      </label>}
      <input
        type={type}
        name={name}
        id={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        autoComplete="off"
        className={inputClasses || "rounded p-2 outline-none text-sm"}
      />
      {formik.touched[name] && formik.errors[name] ? <p className={errorClasses || "text-white"}>{formik.errors[name]}</p> : null}
    </div>
  );
}
export default Input
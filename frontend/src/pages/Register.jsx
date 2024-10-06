import { useFormik } from "formik";
import Button from "../components/Button";
import Input from "../components/Input";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectUser } from "../features/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .test("nitk-email", "Not a valid NITK email", (value) => {
          const regex = /^[\w.+\-]+@nitk\.edu\.in$/;
          return regex.test(value);
        }),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
      .required("Required")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      })
    }),
    onSubmit: (values) => {
      dispatch(registerUser({name:values.name,email:values.email,password:values.password }));
    },
  });

  useEffect(() => {
    if (user.token) navigate("/dashboard");
  }, [user]);

  return (
    <>
      <section className="mt-4">
        <div className="container mx-auto flex justify-center items-center m-2">
          <div className="w-full max-w-sm rounded-lg mx-auto px-2 bg-orange-500 p-3 py-5">
            <div className="text-3xl font-semibold text-white text-center mb-4">
              REGISTER
            </div>
            <form onSubmit={formik.handleSubmit} className="px-5 space-y-5">
              <Input name="name" type="text" formik={formik} />
              <Input name="email" type="email" formik={formik} />
              <Input name="password" type="password" formik={formik} />
              <Input name="confirmPassword" type="password" formik={formik} />
              <Button type="submit" full inverted>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Register;

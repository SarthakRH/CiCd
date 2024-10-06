import Input from "../../components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button";
import { selectUser } from "../../features/user";
import { useSelector } from "react-redux";
import axios from "axios";

const AddQuestion = ({ categoryId,setQuestion}) => {
  const user = useSelector(selectUser);
  const formik = useFormik({
    initialValues: {
      question: "",
    },
    validationSchema: Yup.object({
      question: Yup.string().required("Required"),
    }),     
    onSubmit: async (values) => {
      const body = {
        question: values.question,
        id: categoryId,
      };
      try {
        const res = await axios.post("http://13.232.88.63:5000/admin/question", body, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setQuestion(prev=>{ return ({
            ...prev,
            questions:[res.data._doc, ...prev.questions]
        })})
        values.question=""
      } catch (error) {
        alert(error.message);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="mb-6">
        <Input
          type="text"
          name="question"
          formik={formik}
          nolabel
          inputClasses="rounded p-2 outline-none text-sm border-2 border-black w-50 mb-4"
          errorClasses="text-red-600"
        />
        <Button type="submit" className="mt-4">
          Add
        </Button>
      </form>
    </div>
  );
};
export default AddQuestion;

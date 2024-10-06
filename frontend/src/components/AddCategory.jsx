import {useFormik} from 'formik'
import * as Yup from 'yup';
import Button from './Button';
import Input from './Input';
import axios from 'axios';
import {useSelector} from 'react-redux'
import {selectUser}  from '../features/user'

const AddCategory = ({setCategory}) => {
  const user = useSelector(selectUser);
  const formik = useFormik({
    initialValues:{name:""},
    validationSchema:Yup.object({
      name:Yup.string().required("Required")
    }),
    onSubmit:async (values)=>{
        try {
          
          const res = await axios.post(
            "http://13.232.88.63:5000/admin/category",
            { ...values },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setCategory((prev) => {
            return ([
              ...prev,
              res.data
            ])
          });
        } catch (error) {
          alert(error.message)
        }
    }
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="mb-6">
        <Input
          type="text"
          name="name"
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
}
export default AddCategory
import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom"
import useAxios from "../hooks/useAxios";
import { selectUser } from "../features/user";
import { useSelector } from "react-redux";
import { Formik ,Form, Field,ErrorMessage} from "formik";
import  * as Yup from 'yup';
import Button from "../components/Button";
import axios from "axios";

const AddGyan = () => {
    const user = useSelector(selectUser)
    const [questions,setQuestions] = useState({})
    const [validationSchema,setValidationSchema] = useState({})
    const navigate = useNavigate();
    const location = useLocation();
    const category = useAxios({
        method:'GET',
        url:`http://13.232.88.63:5000/admin/question/${location.state.category._id}`,
        headers:{
            Authorization:`Bearer ${user.token}`
        }
    })

    useEffect(()=>{
        if(category.response!=null){
            setQuestions(()=>{
                let q = {};
                category.response.questions.forEach(item=> q[item.question]="")
                return q;
            })
            setValidationSchema(()=>{
                let v = {};
                category.response.questions.forEach(item=>v[item.question]=Yup.string().required('Required'))
                return Yup.object(v);
            })
        }
    },[category.response])
  return (
    <section className="m-4">
      <div className="container mx-auto">
        {category.loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div>
              <h1 className="underline text-3xl text-center uppercase font-bold text-orange-500 mb-6">
                {location.state.category.name}
              </h1>
            </div>
            <Formik
              initialValues={questions}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try{let answers = [];
                category.response.questions.forEach((question)=>{
                    const answer = {
                        question: question,
                        answer: values[question.question]
                    }
                    answers.push(answer)
                })
                await axios.post("http://13.232.88.63:5000/gyan",{
                    catId:location.state.category._id,
                    user:location.state.id,
                    answers
                },{
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                });
                navigate('/dashboard')
            }catch(error){
                alert(error.message)
            }
                
              }
            }
            >
              <Form>
                <div className="flex flex-col space-y-4">
                  {category.response.questions.map((item) => (
                    <div className="flex flex-col space-y-2" key={item._id}>
                      <label
                        htmlFor={item.question}
                        className="text-orange-500 font-semibold"
                      >
                        {item.question}
                      </label>
                      <Field
                        as="textarea"
                        id={item.question}
                        name={item.question}
                        className="border-2 outline-none focus:border-orange-500 p-2"
                      />
                      <ErrorMessage name={item.question} component="div" className="text-red-600" />
                    </div>
                  ))}
                </div>
                <Button type="submit" className="mt-4">
                  Submit
                </Button>
              </Form>
            </Formik>
          </>
        )}
      </div>
    </section>
  );
}
export default AddGyan
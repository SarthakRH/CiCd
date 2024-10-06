import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { selectUser } from "../features/user";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import axios from "axios";
import UserRecord from "../components/UserRecord";

const EditGyan = () => {
  const user = useSelector(selectUser);
  const [questions, setQuestions] = useState(null);
  const [validationSchema, setValidationSchema] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const gyan = location.state.gyan;
  const category = useAxios({
    method: "GET",
    url: `http://13.232.88.63:5000/admin/question/${gyan.category._id}`,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  useEffect(() => {
    if (category.response != null) {
      console.log(category.response);
      setQuestions(()=>{
          let q = {};
          category.response.questions.forEach((item) => {
            const answer = gyan.answers.find(
              (answer) => answer.question._id == item._id
            );
            if(answer)
                q[item.question] = answer.answer;
            else
                q[item.question] = "";
            
          });
          console.log({ q });
          return q;

      });
      setValidationSchema(() => {
        let v = {};
        category.response.questions.forEach(
          (item) => (v[item.question] = Yup.string().required("Required"))
        );
        console.log({ v });
        return Yup.object(v);
      });
    }
  }, [category.response]);
  return (
    <section className="m-4">
      <div className="container mx-auto">
        {(category.loading || !questions )? (
          <p>Loading...</p>
        ) : (
          <>
            <h1 className="underline text-3xl mb-4 text-center uppercase font-bold text-orange-500">
              {gyan.category.name}
            </h1>
            <div className="flex flex-col space-y-6 md:flex-row md:space-x-20 md:justify-center px-4 mb-8">
              <div>
                <img
                  src={gyan.user.avatar}
                  alt={gyan.user.name}
                  className="w-60"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <UserRecord name="Name" value={gyan.user.name} />
                <UserRecord name="Branch" value={gyan.user.branch} />
                <UserRecord name="Batch" value={gyan.user.yearOfPassing} />
                <UserRecord name="Status" value={gyan.user.status} />
              </div>
            </div>
           <Formik
              initialValues={questions}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  let answers = [];
                  category.response.questions.forEach((question) => {
                    const answer = {
                      question: question,
                      answer: values[question.question],
                    };
                    answers.push(answer);
                  });
                  await axios.patch(
                    `http://13.232.88.63:5000/gyan/${gyan._id}`,
                    {
                      answers,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${user.token}`,
                      },
                    }
                  );
                  navigate('/gyan');
                } catch (error) {
                  alert(error.message);
                }
              }}
            >
              {({ values }) => (
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
                          value={values[item.question]}
                          className="border-2 outline-none focus:border-orange-500 p-2"
                        />
                        <ErrorMessage
                          name={item.question}
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    ))}
                  </div>
                  <Button type="submit" className="mt-4">
                    Edit
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </section>
  );
};
export default EditGyan;

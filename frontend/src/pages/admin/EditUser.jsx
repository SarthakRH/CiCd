import { Formik, Field, Form } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { selectUser } from "../../features/user";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import axios from "axios";
import UserRecord from "../../components/UserRecord";

const EditUser = () => {
  const USER = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAxios({
    method: "GET",
    url: `http://13.232.88.63:5000/admin/user/${location.state.id}`,
    headers: {
      Authorization: `Bearer ${USER.token}`,
    },
  });

  const categories = useAxios({
    method: "GET",
    url: `http://13.232.88.63:5000/admin/category`,
    headers: {
      Authorization: `Bearer ${USER.token}`,
    },
  });

  return (
    <section className="m-4">
      <div className="container mx-auto">
        {user.loading || categories.loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h1 className="underline text-3xl mb-4 text-center uppercase font-bold text-orange-500">
              Edit User
            </h1>
            <Formik
              initialValues={{
                status: user.response.status,
                categories: user.response.categories.map(
                  (category) => category._id
                ),
                role: user.response.role,
              }}
              onSubmit={async (values) => {
                console.log(values);
                try {
                  await axios.patch(
                    `http://13.232.88.63:5000/admin/user/${user.response._id}`,
                    { ...values },
                    {
                      headers: {
                        Authorization: `Bearer ${USER.token}`,
                      },
                    }
                  );
                  navigate("/admin/users");
                } catch (error) {
                  alert(error.message);
                }
              }}
            >
              {({ values }) => (
                <>
                  <div className="flex flex-col space-y-6 md:flex-row md:space-x-20 md:justify-center px-4 mb-8">
                    <div>
                      <img
                        src={user.response.avatar}
                        alt={user.response.name}
                        className="w-60"
                      />
                    </div>
                    <div className="flex flex-col space-y-4">
                      <UserRecord name="Name" value={user.response.name} />
                      <UserRecord name="Branch" value={user.response.branch} />
                      <UserRecord
                        name="Batch"
                        value={user.response.yearOfPassing}
                      />
                      <UserRecord name="Status" value={values.status} />
                    </div>
                  </div>
                  <Form className="flex flex-col space-y-6">
                    {((USER.role == "ICO" && values.status != "placed") ||
                      USER.role == "ADMIN" ||
                      USER.role == "PCO") && (
                      <div>
                        <p className="text-lg text-orange-500 mb-2">Status</p>
                        <div
                          role="group"
                          className="flex items-center space-x-4"
                        >
                          <label>
                            <Field
                              type="radio"
                              name="status"
                              value="none"
                              className="mr-2"
                            />
                            None
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="status"
                              value="interned"
                              className="mr-2"
                            />
                            Interned
                          </label>
                          {USER.role != "ICO" && (
                            <label>
                              <Field
                                type="radio"
                                name="status"
                                value="placed"
                                className="mr-2"
                              />
                              Placed
                            </label>
                          )}
                          {USER.role == "ADMIN" && (
                            <label>
                              <Field
                                type="radio"
                                name="status"
                                value="others"
                                className="mr-2"
                              />
                              Others
                            </label>
                          )}
                        </div>
                      </div>
                    )}
                    <div>
                      {USER.role == "ADMIN" && (
                        <>
                          <p className="text-lg text-orange-500 mb-2">
                            Allowed Categories
                          </p>
                          <div
                            role="group"
                            className="flex items-center space-x-4"
                          >
                            {categories.response.map((category) => (
                              <label key={category._id}>
                                <Field
                                  type="checkbox"
                                  name="categories"
                                  value={category._id}
                                  className="mr-2"
                                />
                                {category.name.toUpperCase()}
                              </label>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    {USER.role == "ADMIN" && (
                      <div>
                        <p className="text-lg text-orange-500 mb-2">Role</p>
                        <div
                          role="group"
                          className="flex items-center space-x-4"
                        >
                          <label>
                            <Field
                              type="radio"
                              name="role"
                              value="USER"
                              className="mr-2"
                            />
                            User
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="role"
                              value="PCO"
                              className="mr-2"
                            />
                            Placement Coordinator
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="role"
                              value="ICO"
                              className="mr-2"
                            />
                            Internship Coordinator
                          </label>
                        </div>
                      </div>
                    )}
                    <Button type="submit" className="max-w-min">
                      Edit
                    </Button>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        )}
      </div>
    </section>
  );
};
export default EditUser;

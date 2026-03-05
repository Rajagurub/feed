import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/InputFiled";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/users/usersSlice";
import { selectUsers } from "../store/users/usersSelectors";
import { AppDispatch } from "../store";
  import { toast } from 'react-toastify';
interface RegisterValues {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Minimum 3 characters"),

  username: Yup.string()
    .required("Username is required")
    .min(3, "Minimum 3 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers)
  const initialValues: RegisterValues = {
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: RegisterValues) => {
   const uniqueUserName=users.filter((el)=>el.username===values.username)?.length>0;
    if(!uniqueUserName){
             const { confirmPassword, ...payload } = values;
  dispatch(addUser(payload));
  toast.success("User added successfully");
   navigate("/auth/login");
    }
    else{
        toast("Username must be unique", {
  type: "error",
});
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Register
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <Input
                  name="name"
                  placeholder="Enter your name"
                  value={values.name}
                  onChangeFun={handleChange}
                  onBlurFun={handleBlur}
                />
                {errors.name && touched.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <Input
                  name="username"
                  placeholder="Enter username"
                  value={values.username}
                  onChangeFun={handleChange}
                  onBlurFun={handleBlur}
                />
                {errors.username && touched.username && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.username}
                  </p>
                )}
              </div>
              <div>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={values.password}
                  onChangeFun={handleChange}
                  onBlurFun={handleBlur}
                />
                {errors.password && touched.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
              <div>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={values.confirmPassword}
                  onChangeFun={handleChange}
                  onBlurFun={handleBlur}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="contained"
                buttonText="Register"
                buttonFunction={() => {}}
              />

              {/* Bottom Navigation */}
              <div className="text-center text-sm mt-4">
                <span className="text-gray-600">
                  Already have an account?{" "}
                </span>
                <Link
                  to="/auth/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Login
                </Link>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
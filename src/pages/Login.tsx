import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputFiled from "../components/InputFiled";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { selectUsers } from "../store/users/usersSelectors";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

interface LoginValues {
  username: string;
  password: string;
}

const LoginSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Minimum 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const users = useSelector(selectUsers)
  
  const initialValues: LoginValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values: LoginValues) => {
    const ifUserExist=users.filter((el)=>el.username===values.username)?.length>0;
    const isCorrectAuth=users.filter((el)=>el.username===values.username&&el.password===values.password).length>0;
    if(ifUserExist){
 if(isCorrectAuth){
         toast.success("Login successful");
         Cookies.set("isAuthenticated", "true", { expires: 1 });
Cookies.set("userName", values.username, { expires: 1 });
navigate("/post");
    }
    else{
       toast("Invalid credentials", {
  type: "error",
});
    }
    }
    else{
    toast("User not found!", {
  type: "error",
});
    }
    console.log("Login Data:", values);
  };
console.log(users,"users")
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Login
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <InputFiled
                  name="username"
                  placeholder="Enter username"
                  value={values.username}
                  onChangeFun={handleChange}
                  onBlurFun={handleBlur}
                />
                {errors.username && touched.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.username}
                  </p>
                )}
              </div>
              <div>
                <InputFiled
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={values.password}
                  onChangeFun={handleChange}
                  onBlurFun={handleBlur}
                />
                {errors.password && touched.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="contained"
                buttonText="Login"
                buttonFunction={() => {}}
              />

            </Form>
          )}
        </Formik>
        <div className="text-center text-sm mt-4">
  <span className="text-gray-600">Create account? </span>
  <button
    type="button"
    onClick={() => navigate("/auth/register")}
    className="text-blue-600 hover:underline font-medium"
  >
    Register
  </button>
</div>
      </div>
    </div>
  );
};

export default Login;
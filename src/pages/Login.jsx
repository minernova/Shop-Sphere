import React from "react";
import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { loginUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const action = (store)=> async ({request}) => {
  const formData=await request.formData()
  const data = Object.fromEntries(formData);
  try {
    const response=await customFetch.post('/auth/local', data);
    store.dispatch(loginUser(response.data));
    toast.success('Logged in Successfully')
    return redirect('/')

  } catch (error) {
    console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your credentials';

      toast.error(errorMessage);
      return null;
  }
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const guestLogin =async () => { 
    try {
      const response = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      });
      dispatch(loginUser(response.data));
      navigate('/')
      toast.success('welcome guest user');

    } catch (error) {
      console.log(error);
      toast.error('guest user login error. Please try later.');
    }
   }
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="identifier"
          defaultValue="test@test.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button type="button" className="btn btn-secondary btn-block" onClick={guestLogin}>
          guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
}

import { FormInput, SubmitBtn } from '../components';
import { Form, redirect, Link } from 'react-router-dom';

import { customFetch } from '../utils';
import { toast } from 'react-toastify';
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post('/auth/local/register', data);
    console.log(response);
    toast.success('account created successfully');
    return redirect('/login');
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      'please double check your credentials';

    toast.error(errorMessage);
    return null;
  }
};


const Register = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='POST'
        className='card w-96 py-8 px-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Register</h4>
        <FormInput type='text' label='username' name='username' defaultValue='' />
        <FormInput type='email' label='email' name='email' defaultValue=''/>
        <FormInput type='password' label='password' name='password' defaultValue=''/>
        <div className='mt-4'>
          <SubmitBtn text='register' />
        </div>

        <p className='text-center'>
          Already a member?
          <Link
            to='/login'
            className='ml-2 link link-hover link-primary capitalize'
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import { BiHide, BiShow } from 'react-icons/bi';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInputWithIcon, TextInput, Button, CustomIcon } from '@/components';
import { task_logo } from '@/assets';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { signUpUserAsync } from '@/app/services/authService';

const schema = yup
  .object({
    fullName: yup.string().required('Full name is required'),
    email: yup.string().required().email('Invalid email address'),
    phone: yup
      .number()
      .min(11, 'Please provide a valid phone number')
      .required(),
    password: yup.string().required(),
    rpassword: yup.string().required('Confirm your password'),
  })
  .required();

const SignupUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('data entered:', data);
    const formData = {
      ...data,
    };
    console.log('data entered:', formData);
    dispatch(signUpUserAsync({ formData, toast, navigate }));
  };

  return (
    <>
      <AuthLayout title={'User Registration'}>
        <div className="flex flex-col items-center w-full h-full">
          <Link to={'/'} className="mx-auto mt-6">
            <CustomIcon
              icon={task_logo}
              title="Task Management"
              className="text-center"
            />
          </Link>
          <div className="flex flex-col items-center w-full mt-8 ">
            <div className="text-center">
              <h1 className="text-[22px] xxs:text-[16px] xs:text-[16px] text-gray-800 font-bold">
                Provide your information
              </h1>
            </div>
            <div className="flex flex-col my-6 w-full justify-center items-center">
              <div className="w-2/6 xxs:w-5/6 xs:w-4/6 md:w-5/6 lg:w-3/6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                  method="POST"
                >
                  <TextInput
                    errors={errors}
                    type="text"
                    placeholder="Full Name"
                    {...register('fullName')}
                    className="h-[45px] text-[12px] bg-inherit"
                  />
                  <TextInput
                    errors={errors}
                    type="text"
                    placeholder="Email Address"
                    {...register('email')}
                    className="h-[45px] text-[12px] bg-inherit"
                  />
                  <TextInput
                    errors={errors}
                    type="text"
                    placeholder="Phone Number"
                    {...register('phone')}
                    className="h-[45px] text-[12px] bg-inherit"
                  />
                  <TextInputWithIcon
                    {...register('password')}
                    type="password"
                    placeholder="Enter Password"
                    className="h-[45px] text-[12px] w-full bg-inherit"
                    errors={errors}
                    RightIcon={show ? BiShow : BiHide}
                    setShow={setShow}
                    show={show}
                  />
                  <TextInputWithIcon
                    {...register('rpassword')}
                    type="password"
                    placeholder="Confirm Password"
                    className="h-[45px] text-[12px] w-full bg-inherit"
                    errors={errors}
                    RightIcon={show ? BiShow : BiHide}
                    setShow={setShow}
                    show={show}
                  />
                  <div>
                    <Button
                      type={'submit'}
                      label={'Register'}
                      className={`px-8 py-3  rounded-xl bg-[#186B43] text-white w-full text-[13px] -mt-2`}
                    />
                  </div>
                </form>
                <div className="mt-[26px] w-full">
                  <h1 className="text-[14px] text-gray-600 text-center">
                    Already have an account?{' '}
                    <Link
                      to={'/auth/login'}
                      className="font-semibold text-[13px] text-green-700 underline"
                    >
                      To log in
                    </Link>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default SignupUser;

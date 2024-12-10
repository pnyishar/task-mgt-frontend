import { useState } from 'react';
import AuthLayout from '@/layouts/AuthLayout';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BiUser, BiLockAlt, BiHide, BiShow } from 'react-icons/bi';

import { TextInputWithIcon, Button, CustomIcon } from '@/components';
import { arrow_icon, white_arrow, task_logo } from '@/assets';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginAsync } from '@/app/services/authService';

const schema = yup
  .object({
    username: yup
      .string()
      .required('Email address is required')
      .email('Invalid email address'),
    password: yup.string().required('Password is required'),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { loading, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    data.rememberMe = true;
    dispatch(loginAsync({ formData: data, toast, navigate }));
  };

  return (
    <AuthLayout title={'Sign In'}>
      <div className="flex flex-col items-center w-full">
        <Link to={'/'} className="mx-auto mt-6 mb-32">
          <CustomIcon
            icon={task_logo}
            title="Task Management"
            className="text-center"
          />
        </Link>
        <div className="flex flex-col justify-center items-center text-center w-full">
          <h3 className="text-[31px] xxs:text-[18px] xs:text-[18px] text-black mb-[41px]">
            Please enter your login information
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete={'off'}
            className="flex flex-col w-2/6 xxs:w-5/6 xs:w-4/6 xxs:px-4 xs:px-4 mx-auto"
          >
            <div>
              <TextInputWithIcon
                {...register('username')}
                className={'h-[45px] text-[12px] bg-inherit'}
                placeholder="Email Address"
                type="text"
                errors={errors}
                LeftIcon={BiUser}
              />
            </div>
            <div>
              <TextInputWithIcon
                {...register('password')}
                className={'h-[45px] text-[12px] bg-inherit'}
                placeholder="Password"
                type={show ? 'text' : 'password'}
                errors={errors}
                LeftIcon={BiLockAlt}
                RightIcon={show ? BiShow : BiHide}
                setShow={setShow}
                show={show}
              />
            </div>
            <div className="flex xxs:flex-col-reverse justify-center w-full -mb-4">
              <Link className="text-[13px]" to={'/auth/forgot-password'}>
                Forgot your password?
              </Link>
            </div>
            <Button
              type={'submit'}
              label={'To log in'}
              disabled={loading}
              className={`px-8 py-3 ${
                loading && 'btn loading'
              } rounded-xl bg-[#186B43] text-white w-full text-[16px] -mt-2`}
              RightIcon={white_arrow}
              iconSize="w-6"
            />
          </form>
          <div className="mt-[37px]">
            <h1 className="text-[14px] xxs:text-[12px] xs:text-[12px] text-gray-600">
              You do not have an account?{' '}
              <Link
                to={'/auth/register'}
                className="font-semibold text-[13px] text-green-700 underline"
              >
                Create an account
              </Link>
            </h1>
          </div>
        </div>
        <div className="absolute left-12 xxs:left-4 xs:left-4 top-6">
          <img
            src={arrow_icon}
            className="h-6 w-6 cursor-pointer"
            alt="back arrow"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;

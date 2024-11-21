import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { customer_login, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import FadeLoader from 'react-spinners/FadeLoader';


const Login = () => {
  const { loader, successMessage, errorMessage, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(customer_login(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate('/');
    }
  }, [successMessage, errorMessage, userInfo, dispatch, navigate]);

  return (
    <section className="">
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
          <FadeLoader />
        </div>
      )}

      <div className="lg:grid lg:min-h-screen ">
        {/* Left Section */}
        <section className="relative flex h-32 sm:hidden items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        data-testid="Login_image"
        src="https://img.freepik.com/premium-photo/spring-sowing-season-farmer-with-tractor-sows-corn-seeds-his-field-planting-corn-with-trailed-planter-farming-seeding-concept-agriculture-agricultural-machinery_194143-5782.jpg?w=740"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <a className="flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20" href="#">
          <span className="sr-only">Home</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
        </svg>
        </a>

        <h2 data-testid="text-title" className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to <span>sitecraft</span>
        </h2>

        <p data-testid="text-paragraph" className="mt-4 leading-relaxed text-white/90">
          Swift and reliable emergency responses: your safety is our priority. Trust us for quick assistance when you need it most.
        </p>
      </div>
    </section>

        {/* Right Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="text-center">
              <h3 className="text-2xl mb-3 font-semibold text-slate-900">Login to your account</h3>
              <p className="text-sm text-slate-600">You must be logged in to perform this action.</p>
            </div>

            {/* Third-party Login Buttons */}
            <div className="mt-7 flex flex-col gap-2">
              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px]"
                />
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>OR<div className="h-px w-full bg-slate-200"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={login} className="w-full">
              <input
                name="email"
                type="email"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Email Address"
                value={state.email}
                onChange={inputHandle}
              />
              <input
                name="password"
                type="password"
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Password"
                value={state.password}
                onChange={inputHandle}
              />
              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white">
                Continue
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <a href="/register" className="font-medium text-[#4285f4]">
                Sign up
              </a>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
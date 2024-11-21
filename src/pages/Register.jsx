import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { FaFacebookF } from 'react-icons/fa'
import FadeLoader from 'react-spinners/FadeLoader'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineGoogle } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

import { customer_register, messageClear } from '../store/reducers/authReducer'

const Register = () => {
    const navigate = useNavigate()
    const { loader, successMessage, errorMessage, userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault()
        dispatch(customer_register(state))
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (userInfo) {
            navigate('/')
        }
    }, [successMessage, errorMessage])

    return (
        <section className="bg-white w-full">
            {loader && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div className="lg:grid lg:min-h-screen ">
                <section className="relative flex sm:hidden h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://img.freepik.com/free-photo/professional-farmer-with-modern-tractor-work-with-documents-looks-sunshine-agriculture-exhibition-machinery-plant-production-senior-man-near-his-machine_155003-41347.jpg?t=st=1732189853~exp=1732193453~hmac=2502aa894a9e8e81fd2c90eb222b1544cc1fc2cfaf8367cb9d8f3df553cf86a6&w=740"
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

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="p-5">
                            <h3 className="text-2xl mb-0.5 font-medium"></h3>
                            <p className="mb-4 text-sm font-normal text-gray-800"></p>

                            <div className="text-center">
                                <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                                    Register  your account
                                </p>
                                <p className="mt-2 text-sm leading-4 text-slate-600">
                                    You must be logged in to perform this action.
                                </p>
                            </div>

                            <div className="mt-7 flex flex-col gap-2">

                                <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-[18px] w-[18px]" />
                                    Continue with Google
                                </button>
                            </div>

                            <div className="flex w-full items-center gap-2 py-6 text-sm text-gray-400">
                                <p>Already have an account?</p>
                                <Link to="/login" className="font-medium text-blue-600 hover:underline">Login</Link>
                            </div>

                            <div className="relative py-1.5">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-300" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase text-slate-400">
                                    <span className="bg-white px-2 text-sm font-medium text-gray-900">Or</span>
                                </div>
                            </div>

                            <form onSubmit={register}>
                                <div className="space-y-4">
                                    <input 
                                        name="name" 
                                        type="text" 
                                        placeholder="Full Name" 
                                        className="block w-full px-3 py-2 border rounded-md" 
                                        onChange={inputHandle} 
                                    />
                                    <input 
                                        name="email" 
                                        type="email" 
                                        placeholder="Email Address" 
                                        className="block w-full px-3 py-2 border rounded-md" 
                                        onChange={inputHandle} 
                                    />
                                    <input 
                                        name="password" 
                                        type="password" 
                                        placeholder="Password" 
                                        className="block w-full px-3 py-2 border rounded-md" 
                                        onChange={inputHandle} 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full mt-5 bg-black text-white py-2 rounded-lg"
                                    disabled={loader}
                                >
                                    {loader ? 'Loading...' : 'Register'}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default Register
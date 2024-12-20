'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from "react-hook-form";
import apiClient from '../services/apiClient';

export interface User{
    email: String,
    password: String
}

function Home() {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit } = useForm<User>();

    const onSubmit = async (data: User) => {
        apiClient.post("/login", data)
            .then(({ data }) => {
                localStorage.setItem("auth-admin", data.token);
                location.href = "/dashboard";
            })
            .catch((err) => console.log(err));
    };
    
    return (
        <>
            <div className="flex min-h-64 max-w-96 flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white rounded-lg shadow-lg">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                    <img
                        alt="DigitalFlake"
                        src="http://localhost:5173/src/assets/logo.png"
                        className="mx-auto h-24 w-auto"
                    />
                    <p style={{ color: "#a1a1aa" }}>Welcome to Digitalflake admin</p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-400">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-400">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    {...register("password", { required: true })}
                                    type="password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <div className="text-sm text-right mt-3">
                                <a href="#" onClick={() => setOpen(true)} className="font-semibold text-purple-800">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-purple-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-purple-800 text-center">
                                            Did you forget password?
                                        </DialogTitle>
                                        <div className="mt-2 mb-3">
                                            <p className="text-sm text-gray-400">
                                                Enter your email address and we'll send you a link to restore password
                                            </p>
                                        </div>
                                        <form action="#" method="POST" className="space-y-5 px-10">
                                            <div>
                                                <label htmlFor="email" className="block text-sm/6 text-gray-400">
                                                    Email address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        autoComplete="email"
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-400 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="mt-2">
                                                    <button
                                                        type="submit"
                                                        className="flex w-full justify-center rounded-md bg-purple-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Request reset link
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="py-3 text-center">
                                            <button
                                                type="button"
                                                data-autofocus
                                                onClick={() => setOpen(false)}
                                                className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm text-gray-400 sm:mt-0 sm:w-auto underline underline-offset-8"
                                            >
                                                Back to login
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Home;

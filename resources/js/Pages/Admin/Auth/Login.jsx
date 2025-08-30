import React, {useState} from 'react';
import {Link} from "@inertiajs/react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import BasicButton from "@/components/Buttons/BasicButton.jsx";
import { FcGoogle } from "react-icons/fc";

export default function Welcome() {
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="font-[var(--font-primary)] flex flex-col h-screen items-center justify-center bg-background-dark">
            <div className="bg-login-card-body w-7/8 md:w-xl rounded-md shadow-slow-hide hover:shadow-link-color duration-500 ease-in-out">
                <div className="text-center mt-4 md:mt-12 mb-6 md:mb-12">
                    <h3 className="text-xl md:text-4xl font-bold text-white">Sign In</h3>
                    <p className="text-white mt-2 md:mt-6 text-shadow-md text-base md:text-xl">Access Your Account</p>
                </div>

                <div id="card" className="mx-4 md:mx-14 mb-12">
                    <input type="text"
                           className="block text-sm md:text-base w-full p-3.5 h-10 md:h-16 rounded-md border-input-border bg-input-background text-white"
                           placeholder="Your Email"/>

                    <div className="relative mt-5 w-full">
                        <input type={showPass ? "text" : "password"}
                               className="block mt-5 w-full p-3.5 text-sm md:text-base md:h-16 rounded-md border-input-border bg-input-background text-white"
                               placeholder="Password"/>
                        <BasicButton
                            onClick={() => setShowPass(!showPass)}
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-input-background ">
                            { showPass ? <FaRegEyeSlash/> : <FaRegEye/>}
                        </BasicButton>
                    </div>

                    <div className="flex justify-between mt-4">
                        <div className="flex align-middle">
                            <input id="remind_me" type="checkbox"/>
                            <label htmlFor="remind_me" className="text-white mt-[2px] md:mt-0 text-sm md:text-base ml-2">Remind me</label>
                        </div>

                        <Link href="/" className="text-white hover:underline mt-[2px] md:mt-0 text-sm md:text-base">
                            Forget Password?
                        </Link>
                    </div>

                    <div className="mt-12 w-full">
                        <BasicButton className="w-full md:h-16 md:text-2xl font-bold duration-300 ease-in-out shadow-slow-hide hover:shadow-link-color bg-linear-[135deg] to-blue-500 from-green-400 hover:to-blue-400 hover:from-green-300">
                            SIGN IN
                        </BasicButton>
                    </div>

                    <div className="mt-4 text-sm md:text-base md:mt-6 text-center text-white">
                        Does not have an account yet? <Link className="text-link-color hover:underline">Create and account</Link>
                    </div>

                    <div className="flex items-center w-full mt-6 md:mt-12">
                        <div className="flex-grow border-t border-input-border"></div>
                        <span className="mx-4 text-white">OR</span>
                        <div className="flex-grow border-t border-input-border"></div>
                    </div>

                    <div className="text-white flex justify-center mt-4 md:mt-6">
                        <BasicButton className="flex md:px-6 items-center border border-login-card-body duration-300 ease-in-out shadow-basic-hide hover:shadow-link-color hover:border hover:border-link-color">
                            <FcGoogle className="text-3xl" />
                            <div className="ml-2">
                                Continue with Google
                            </div>
                        </BasicButton>
                    </div>
                </div>
            </div>


        </div>
    );
}

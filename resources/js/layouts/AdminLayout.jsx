import {Link, usePage} from "@inertiajs/react";
import {IoIosArrowForward} from "react-icons/io";
import {useEffect, useRef, useState} from "react";
import {GoHome} from "react-icons/go";
import {LuFileSpreadsheet} from "react-icons/lu";
import Sidebar from "@/layouts/Sidebar.jsx";



export default function AdminLayout({children }) {
    const [profileShow, setProfileShow] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileShow(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    return (
        <div className="flex flex-col h-screen bg-prime-base">
            <header className="bg-white z-10" style={{ boxShadow: "var(--shadow-after-header)" }}>
                <nav className="flex justify-between items-center w-full mx-auto">
                    <div className="w-[15%] font-bold text-gray-800 pl-6 py-4">
                        <Link href={route('admin.dashboard')}>
                            <img className="object-cover w-[180px]" src="/backend/images/logo.png" alt="Header Image"/>
                        </Link>
                    </div>
                    <div className="w-[85%] flex items-center justify-between px-5 min-h-fit">
                        <div className="flex items-center gap-[4vw]">

                        </div>
                        <div className="flex items-center gap-[4vw]">
                            <div className="cursor-pointer relative" ref={dropdownRef}>
                                <img onClick={() => setProfileShow(!profileShow)}
                                     className="object-cover rounded-full border-2 border-border-color w-[40px]"
                                     src="/backend/images/user.jpg"
                                     alt="user"/>
                                <ul className={`absolute bg-red-700 w-[180px] -right-[12px] rounded-md duration-300 ease-in-out mt-4 p-2 ${profileShow ? 'block' : 'hidden'}`}>
                                    <li className="p-2 hover:bg-sky-500">Profile</li>
                                    <li className="p-2">Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="flex flex-1 w-full mx-auto ">
                <Sidebar/>
                <div className="w-[85%] p-2">
                    {children}
                </div>
            </div>
        </div>
    )
}

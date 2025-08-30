import {useEffect, useRef, useState} from "react";
import {GoHome} from "react-icons/go";
import {IoIosArrowForward} from "react-icons/io";
import {BsDot} from "react-icons/bs";

export default function AdminDashboard() {
    const [profileShow, setProfileShow] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);

    const dropdownRef = useRef(null);

    const toggleMenu = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
        <div className="flex flex-col h-screen">
            <header className="bg-sky-500">
                <nav className="flex justify-between items-center w-full mx-auto">
                    <div className="w-[15%] font-bold text-gray-800 pl-6 bg-red-700 border-r py-4">
                        <img src="/backend/images/logo.png" alt="Header Image"/>
                    </div>
                    <div className="w-[85%] flex items-center justify-between px-5 min-h-fit">
                        <div className="flex items-center gap-[4vw]">

                        </div>
                        <div className="flex items-center gap-[4vw]">
                            <div className="cursor-pointer relative" ref={dropdownRef}>
                                <img onClick={() => setProfileShow(!profileShow)}
                                     className="object-cover rounded-full w-[40px]" src="/backend/images/user.jpg"
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
            <div className="flex flex-1 w-full mx-auto">
                <div className="w-[15%] bg-orange-400">
                    Sidebar
                    <div>
                        <ul className="flex flex-col py-2 pl-6 pr-4">
                            <li onClick={() => toggleMenu(0)}
                                className="p-2 m-0 flex flex-col duration-300 text-lg hover:bg-indigo-600">
                                <div className="flex items-center gap-2">
                                    <GoHome/>
                                    Dashboard
                                    <IoIosArrowForward
                                        className={`ml-auto transform transition-transform duration-300 ${
                                            openIndex === 0 ? "rotate-90" : ""
                                        }`}
                                    />
                                </div>

                                <ul className={`ml-6 overflow-hidden transition-all duration-300 ${
                                    openIndex === 0 ? "max-h-96" : "max-h-0"
                                }`}>
                                    <li className="flex items-center gap-1 p-2 hover:bg-white">
                                        <BsDot/> Apps
                                    </li>
                                    <li>UI Kits</li>
                                    <li>Form</li>
                                    <li>Board</li>
                                    <li>Invoice</li>
                                    <li>Calender</li>
                                    <li>Order</li>
                                    <li>Products</li>
                                </ul>

                            </li>
                            <li>Apps</li>
                            <li>UI Kits</li>
                            <li>Form</li>
                            <li>Board</li>
                            <li>Invoice</li>
                            <li>Calender</li>
                            <li>Order</li>
                            <li>Products</li>
                        </ul>
                    </div>
                </div>
                <div className="w-[85%] bg-red-700">world</div>
            </div>
        </div>


    )
}

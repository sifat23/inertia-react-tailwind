import {useEffect, useRef, useState} from "react";
import {GoHome} from "react-icons/go";
import {IoIosArrowForward} from "react-icons/io";
import {BsDot} from "react-icons/bs";
import {Link} from "@inertiajs/react";


const menuItems = [
    {
        label: "Dashboard",
        icon: <GoHome />,
        children: [
            { label: "Apps", icon: <BsDot /> },
            { label: "UI Kits" },
            { label: "Form" },
            { label: "Board" },
            { label: "Invoice" },
            { label: "Calendar" },
            { label: "Order" },
            { label: "Products" },
        ],
    },
    { label: "Apps" },
    { label: "UI Kits" },
    { label: "Form" },
    { label: "Board" },
    { label: "Invoice" },
    { label: "Calendar" },
    { label: "Order" },
    { label: "Products" },
];

export default function AdminDashboard() {
    const [profileShow, setProfileShow] = useState(false);
    const [openMenus, setOpenMenus] = useState({});

    const dropdownRef = useRef(null);


    const toggleMenu = (label) => {
        setOpenMenus((prev) => ({
            ...prev,
            [label]: !prev[label], // toggle by menu label
        }));
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
        <div className="flex flex-col h-screen bg-white">
            <header className="">
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
                                     className="object-cover rounded-full border-2 border-border-color w-[40px]" src="/backend/images/user.jpg"
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
                <div className="w-[15%]">
                    <div className="pt-2">
                        <ul className="flex flex-col py-2 pl-6 pr-4">
                            <li onClick={() => toggleMenu(0)}
                                className="m-0 flex flex-col text-lg hover:cursor-pointer">
                                <div className={`${openIndex === 0 ? 'bg-blue-800 text-white' : ''} p-2 duration-300 rounded-md flex items-center gap-2 hover:bg-blue-800 hover:text-white`}>
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
                                    <li className="p-2 hover:text-submenu-hover">
                                        <Link href="#" className="flex items-center gap-1">
                                            <BsDot/> Apps
                                        </Link>
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

                        </ul>
                    </div>
                </div>
                <div className="w-[85%] bg-red-700">world</div>
            </div>
        </div>


    )
}

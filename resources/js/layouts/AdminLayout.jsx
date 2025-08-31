import {Link, usePage} from "@inertiajs/react";
import {IoIosArrowForward} from "react-icons/io";
import {useEffect, useRef, useState} from "react";
import {GoHome} from "react-icons/go";
import {LuFileSpreadsheet} from "react-icons/lu";

const menuItems = [
    {
        label: "Dashboard",
        icon: <GoHome/>,
        prefix: ['admin/dashboard'],
        link: route('admin.dashboard')
    },
    {
        label: "Study Materials",
        icon: <LuFileSpreadsheet/>,
        prefix: ['admin/category'],
        children: [
            {label: "Manage Category", link: 'admin.category'},
            {label: "Manage Sub Category",},
        ],
    },
    {label: "UI Kits"},
    {label: "Form"},
    {label: "Board"},
    {label: "Invoice"},
    {label: "Calendar"},
    {label: "Order"},
    {label: "Products"},
];

export default function AdminLayout({children }) {
    const [profileShow, setProfileShow] = useState(false);
    const [openMenus, setOpenMenus] = useState({});

    const dropdownRef = useRef(null);
    const {props} = usePage();
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



    const isActiveMenu = (item) => {
        if (item.prefix) {
            return item.prefix.some((prefix) => props.currentRoute.url.startsWith(prefix));
        }

        if (item.children) {
            return item.children.some((child) =>
                props.currentRoute.url.startsWith(route(child.link))
            );
        }

        return false;
    };

    useEffect(() => {
        menuItems.forEach((item) => {
            if (item.children && isActiveMenu(item)) {
                setOpenMenus((prev) => ({
                    ...prev,
                    [item.label]: true,
                }));
            }
        });
    }, [props.currentRoute.url]);

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
            <div className="flex flex-1 w-full mx-auto">
                <div className="w-[15%]">
                    <div className="pt-2">
                        <ul className="flex flex-col py-2 pl-6 pr-4">
                            {menuItems.map((item) => {
                                const active = isActiveMenu(item);

                                return (
                                    <li key={item.label}
                                        className="p-2 flex flex-col text-base">
                                        <Link href={item.link}>
                                            <div
                                                className={`${active ? 'bg-blue-800 text-white' : ''} p-2 duration-300 rounded-md flex items-center gap-2 hover:bg-blue-800 hover:text-white`}
                                                onClick={() => item.children && toggleMenu(item.label)}
                                            >
                                                {item.icon}
                                                {item.label}
                                                {item.children && (
                                                    <IoIosArrowForward
                                                        className={`ml-auto transform transition-transform duration-300 ${
                                                            openMenus[item.label] ? "rotate-90" : ""
                                                        }`}
                                                    />
                                                )}
                                            </div>
                                        </Link>
                                        {item.children && (
                                            <ul
                                                className={`py-2 pl-2 ml-6 overflow-hidden transition-all duration-300 ${
                                                    openMenus[item.label] ? "max-h-96" : "max-h-0"
                                                }`}
                                            >
                                                {item.children.map((child) => {
                                                    let childActive = false;

                                                    if ('link' in child) {
                                                        childActive = props.currentRoute.name === child.link;
                                                    }

                                                    return  (
                                                        <li
                                                            key={child.label}
                                                            className={`${childActive ? 'border-b-blue-800' : 'border-b-white'} p-2  border-b-2 hover:border-b-blue-800 cursor-pointer`}
                                                        >
                                                            {('link' in child) ? (
                                                                <Link href={route(child.link)} className="flex items-center gap-1">
                                                                    {child.icon}
                                                                    {child.label}
                                                                </Link>
                                                            ) : (
                                                                <Link className="flex items-center gap-1">
                                                                    {child.icon}
                                                                    {child.label}
                                                                </Link>
                                                            )}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="w-[85%] bg-red-700">world
                    {children}
                </div>
            </div>
        </div>
    )
}

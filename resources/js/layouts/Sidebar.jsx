import {Link, usePage} from "@inertiajs/react";
import {IoIosArrowForward} from "react-icons/io";
import {GoHome} from "react-icons/go";
import {LuFileSpreadsheet} from "react-icons/lu";
import {useEffect, useState} from "react";

const menuItems = [
    {
        label: 'MENU',
    },
    {
        label: "Dashboard",
        icon: <GoHome/>,
        prefix: ['admin/dashboard'],
        link: route('admin.dashboard')
    },
    {
        label: "Study Materials",
        icon: <LuFileSpreadsheet/>,
        prefix: ['admin/categories', 'admin/subcategories'],
        children: [
            {label: "Manage Category", link: 'admin.categories.index'},
            {label: "Manage Sub Category", link: 'admin.subcategories.index'},
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

export default function Sidebar() {
    const [openMenus, setOpenMenus] = useState({});


    const {props} = usePage();

    const toggleMenu = (label) => {
        setOpenMenus((prev) => ({
            ...prev,
            [label]: !prev[label], // toggle by menu label
        }));
    };
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
            } else {
                setOpenMenus((prev) => ({
                    ...prev,
                    [item.label]: false,
                }));
            }
        });
    }, [props.currentRoute.url]);

    return (
        <div className="w-[15%] bg-white">
            <div className="pt-2">
                <ul className="flex flex-col pt-4 pl-4 pr-4">
                    {menuItems.map((item) => {
                        const active = isActiveMenu(item);


                        if (item.prefix === undefined) {
                            return (
                                <li key={item.label} className="text-sm font-bold text-blue-800">
                                    {item.label}
                                </li>
                            )
                        } else {
                            if (item.children === undefined) {
                                return (
                                    <li key={item.label}
                                        className={`${active ? 'bg-menu-active text-blue-800 font-bold' : ''} mt-2 p-2 text-sm rounded-md hover:bg-menu-active`}>
                                       <Link href={item.link} className="flex items-center gap-2">
                                           {item.icon}
                                           {item.label}
                                       </Link>
                                    </li>
                                )
                            }
                        }

                        // console.log('sss', item, item.children.length)
                        // if (item.children.length === 0) {
                        // }

                        return (

                            <li key={item.label}
                                className="pt-2 flex flex-col text-sm   ">
                                <Link href={item.link}>
                                    <div
                                        className={`${active ? 'font-bold' : ''}
                                        ${openMenus[item.label] ? 'font-bold' : 'hover:bg-menu-active hover:text-blue-800'}
                                        p-2 duration-300 rounded-md flex items-center gap-2  `}
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
                                        className={`py-2 pl-2 ml-4 border-l-2 border-l-gray-100 overflow-hidden transition-all duration-300 ${
                                            openMenus[item.label] ? "max-h-96" : "max-h-0"
                                        }`}
                                    >
                                        {item.children.map((child) => {
                                            let childActive = false;

                                            if ('link' in child) {
                                                childActive = props.currentRoute.name === child.link;
                                            }

                                            return (
                                                <li
                                                    key={child.label}
                                                    className={`${childActive ? 'bg-menu-active' : ''} p-2 hover:bg-menu-active cursor-pointer`}
                                                >
                                                    {('link' in child) ? (
                                                        <Link href={route(child.link)}
                                                              className="flex items-center gap-1">
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
    )
}

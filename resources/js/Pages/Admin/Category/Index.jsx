import AdminLayout from "@/layouts/AdminLayout.jsx";
import {Link, usePage} from '@inertiajs/react';
import Breadcrumb from "@/components/Breadcrumb.jsx";
import { CiSquarePlus } from "react-icons/ci";

const breadcrumb = [
    {
        label: "Home",
        link: route('admin.dashboard')
    },
    {
        label: "All Category"
    }
]

export default function CategoryIndex() {

    const users = [
        {id: 1, name: "John Doe", email: "john@example.com", role: "Admin"},
        {id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor"},
        {id: 3, name: "Bob Lee", email: "bob@example.com", role: "User"},
    ];

    return (
        <div className="m-4">
            <div className="p-4 bg-white">
                <h2 className="text-xl font-semibold">All Category</h2>
                <Breadcrumb items={breadcrumb}/>
            </div>


            <div className="px-4 pt-6 pb-4 mt-4 bg-white">
                <div className="flex items-center justify-between">
                    <h3>Table Title</h3>
                    <div>
                        <Link className="flex items-center gap-2 bg-permanent-green text-white py-2 px-4 rounded-sm hover:bg-submenu-hover duration-200 ease-in-out">
                           <CiSquarePlus className='text-lg font-bold'/> Create New
                        </Link>

                    </div>
                </div>

                <div className="overflow-x-auto mt-5 rounded-md">
                    <table className="min-w-full border border-gray-200 text-sm text-left">
                        {/* Table Head */}
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr className="border-b border-gray-300">
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4 ">{user.id}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{user.name}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{user.email}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{user.role}</td>
                                <td className="px-6 py-4 border-b border-gray-200">
                                    <button className="text-blue-600 hover:underline mr-2">Edit</button>
                                    <button className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

CategoryIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>

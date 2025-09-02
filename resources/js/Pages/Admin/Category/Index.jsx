import AdminLayout from "@/layouts/AdminLayout.jsx";
import * as Yup from "yup";
import Breadcrumb from "@/components/Breadcrumb.jsx";
import {CiSquarePlus} from "react-icons/ci";
import {RxCross1} from "react-icons/rx";
import BasicButton from "@/components/Buttons/BasicButton.jsx";
import {useState} from "react";
import BasicInput from "@/components/Inputs/BasicInput.jsx";
import BasicSelect from "@/components/Inputs/BasicSelect.jsx";
import {useFormik} from "formik";

const breadcrumb = [
    {
        label: "Home",
        link: route('admin.dashboard')
    },
    {
        label: "All Category"
    }
]

const selectOptions = [
    {
        label: 'Active',
        value: 1,
    },
    {
        label: 'Inactive',
        value: 0,
    }
]

export default function CategoryIndex() {
    const [openInsertBox, setOpenInsertBox] = useState(false);

    const users = [
        {id: 1, name: "John Doe", email: "john@example.com", role: "Admin"},
        {id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor"},
        {id: 3, name: "Bob Lee", email: "bob@example.com", role: "User"},
    ];

    const formik = useFormik({
        initialValues: {
            name: "",
            status: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Category name is required"),
            status: Yup.string().required("Status is required"),
        }),
        onSubmit: (values) => {
            console.log("Form Submitted:", values);
            // Example for Inertia:
            // Inertia.post("/categories", values);
        },
    });


    return (
        <div className="m-4">
            <div className="p-4 bg-white">
                <h2 className="text-xl font-semibold">All Category</h2>
                <Breadcrumb items={breadcrumb}/>
            </div>


            <div className="px-4 pt-6 pb-4 mt-4 bg-white">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl">Table Title</h3>
                    <div>
                        <BasicButton
                            onClick={() => setOpenInsertBox(!openInsertBox)}
                            className="flex items-center gap-2 bg-permanent-green text-white py-2 px-4 rounded-sm hover:bg-submenu-hover duration-200 ease-in-out">
                            <CiSquarePlus className='text-lg font-bold'/> Create New
                        </BasicButton>

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

            <div className={`fixed inset-0 z-50 transition-all duration-300 ${openInsertBox ? 'visible' : 'invisible'}`}>
                {/* Overlay (50% left side) */}
                <div
                    className={`absolute top-0 left-0 w-2/3 h-full bg-black/50 transition-opacity duration-300 ${
                        openInsertBox ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => setOpenInsertBox(false)}
                ></div>

                {/* Sidebar (50% right side) */}
                <div
                    className={`absolute top-0 right-0 w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ${
                        openInsertBox ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="m-2 rounded-md">
                        <div className="p-2 flex items-center justify-between border-b border-b-gray-200">
                            <h2 className="font-semibold text-lg">Create Category</h2>
                            <BasicButton onClick={() => setOpenInsertBox(false)}>
                                <RxCross1 className="text-[20px]" />
                            </BasicButton>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="px-2 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="">
                                        <label>Category Name</label>
                                        <BasicInput
                                            type="text"
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Input field"
                                            className={`${formik.touched.name && formik.errors.name ? 'border-red-300 focus:ring-red-300' : ''} mt-2`}
                                        />
                                        {formik.touched.name && formik.errors.name ? (
                                            <div className="text-red-300 text-sm mt-1">
                                                {formik.errors.name}
                                            </div>
                                        ) : null}
                                    </div>

                                    <div>
                                        <label>Status</label>
                                        <BasicSelect
                                            name='status'
                                            value={formik.values.status}
                                            placeholder="Select One..."
                                            className={`${formik.touched.status && formik.errors.status ? 'border-red-300 focus:ring-red-300' : 'border-gray-300 focus:ring-gray-500'} mt-2`}
                                            options={selectOptions}
                                            onChange={(e) => {
                                                formik.setFieldValue('status', e.target.value)
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.status && formik.errors.status ? (
                                            <div className="text-red-300 text-sm mt-1">
                                                {formik.errors.status}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <BasicButton
                                        type="submit"
                                        disabled={formik.isSubmitting}
                                        className="bg-permanent-green text-white mt-8 w-1/6">
                                        {formik.isSubmitting ? "Saving..." : "Save"}
                                    </BasicButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

CategoryIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>

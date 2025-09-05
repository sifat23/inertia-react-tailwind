import AdminLayout from "@/layouts/AdminLayout.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";
import {CiSquarePlus} from "react-icons/ci";
import {RxCross1} from "react-icons/rx";
import BasicButton from "@/components/Buttons/BasicButton.jsx";
import {useEffect, useState} from "react";
import BasicInput from "@/components/Inputs/BasicInput.jsx";
import BasicSelect from "@/components/Inputs/BasicSelect.jsx";
import {Head, Link, useForm, usePage} from "@inertiajs/react";
import useValidationHook from "@/hooks/useValidationHook.js";
import yup from "@/utilities/yup.js";
import {route} from "ziggy-js";
import InvalidFeedback from "@/components/InvalidFeedback.jsx";
import {toast} from 'react-toastify';
import {applyEnum, ucfirst} from "@/utilities/helpers";
import Pagination from "@/components/Pagination.jsx";
import Badge from "@/components/Badge.jsx";
import {FiAlertTriangle} from "react-icons/fi";

const breadcrumb = [
    {
        label: "Home",
        link: route('admin.dashboard')
    },
    {
        label: "All Subcategory"
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

const loginSchema = yup.object().shape({
    name: yup.string()
        .required('Subcategory name is required'),
    status: yup.string()
        .oneOf(["0", "1"], "Invalid status value")
        .required("Status is required"),
});

export default function SubcategoryIndex({subcategories, statues}) {
    const [openInsertBox, setOpenInsertBox] = useState(false);
    const { flash } = usePage().props;
    const [openModal, setOpenModal] = useState(false);

    const [formMode, setFormMode] = useState('Create'); // 'create' or 'edit'
    const [subcategory, setSubcategory] = useState({});

    useEffect(() => {
        if (flash.success !== null) {
            toast.success(`${flash.success}`)
            reset();
            setOpenInsertBox(false);
        }
        console.log(flash, 'sss')
    }, [flash]);

    let {
        data,
        setData,
        put,
        post,
        reset,
        delete: destroy,
        processing,
        recentlySuccessful,
    } = useForm({
        name: '',
        status: '',
    });

    const {
        validationErrors,
        handleBlur,
        handleChange,
        validateForm,
    } = useValidationHook(loginSchema, data, (field, value) =>
        setData((prev) => ({...prev, [field]: value}))
    );


    const handleForm = async (e) => {
        e.preventDefault();

        const isValid = await validateForm(); // ✅ validate whole form
        if (!isValid) return;

        if (formMode === 'Create') {
            post(route('admin.subcategories.store'));
        } else if (formMode === 'Edit' && subcategory.id) {
            put(route('admin.subcategories.update', {subcategory: subcategory.id}));
        }
    };

    const handleEditForm = async (e, data) => {
        e.preventDefault();
        setData(data)

        console.log('data: ', data);

        setOpenInsertBox(true);
        setSubcategory(data);
        setFormMode('Edit')
    }

    const handleDeleteItem = async (e, data) => {
        e.preventDefault();

        destroy(route('admin.subcategories.destroy', {subcategory: data.id}))
        setOpenModal(false)
    }


    return (
        <>
            <Head title="Subcategory"/>
            <div className="m-4">
                <div className="p-4 bg-white">
                    <h2 className="text-xl font-semibold">All Subcategory</h2>
                    <Breadcrumb items={breadcrumb}/>
                </div>

                <div className="px-4 pt-6 pb-4 mt-4 bg-white">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl">Table Title</h3>
                        <div>
                            <BasicButton
                                theme={'primary'}
                                onClick={() => setOpenInsertBox(!openInsertBox)}
                                className="flex items-center gap-2   ">
                                <CiSquarePlus className='text-lg font-bold'/> Create New
                            </BasicButton>

                        </div>
                    </div>

                    <div className="overflow-x-auto mt-5 rounded-md">
                        <table className="min-w-full border border-gray-200 text-sm text-left">
                            {/* Table Head */}

                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr className="border-b border-gray-300">
                                <th className="px-6 py-3">SL</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                            {subcategories.data.map((data, i) => (
                                <tr
                                    key={data.id}
                                    className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 ">{(subcategories?.current_page - 1) * subcategories.per_page + (i + 1)}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">{data.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-center">
                                        {data.status === statues['ACTIVE'] ? (
                                            <Badge
                                                theme={'success'}
                                                string={applyEnum(statues, data.status)}
                                            />
                                        ): (
                                            <Badge
                                                theme={'danger'}
                                                string={applyEnum(statues, data.status)}
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-center">
                                        <BasicButton
                                            type={"button"}
                                            onClick={(e) => handleEditForm(e, data)}
                                            theme={'outlinePrimary'}>
                                            Edit
                                        </BasicButton>

                                        <BasicButton
                                            onClick={(e) => {
                                                setSubcategory(data)
                                                setOpenModal(true)
                                            }}
                                            className="ml-3"
                                            type={"button"}
                                            theme={'danger'}>
                                            Delete
                                        </BasicButton>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Pagination links={subcategories.links}/>
                    </div>
                </div>


                <div
                    className={`fixed inset-0 z-50 transition-all duration-300 ${openInsertBox ? 'visible' : 'invisible'}`}>
                    {/* Overlay (50% left side) */}
                    <div
                        className={`absolute top-0 left-0 w-2/3 h-full bg-black/50 transition-opacity duration-300 ${
                            openInsertBox ? 'opacity-100' : 'opacity-0'
                        }`}
                        onClick={() => {
                            setOpenInsertBox(false);
                            reset();
                        }}
                    ></div>

                    {/* Sidebar (50% right side) */}
                    <div
                        className={`absolute top-0 right-0 w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ${
                            openInsertBox ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <div className="m-2 rounded-md">
                            <div className="p-2 flex items-center justify-between border-b border-b-gray-200">
                                <h2 className="font-semibold text-lg">{formMode} Subcategory</h2>
                                <BasicButton
                                    theme={'transparent'}
                                    onClick={() => setOpenInsertBox(false)}>
                                    <RxCross1 className="text-[20px]"/>
                                </BasicButton>
                            </div>
                            <form onSubmit={handleForm}>
                                <div className="px-2 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="">
                                            <label>Subcategory Name</label>
                                            <BasicInput
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                                onBlur={() => handleBlur('name')}
                                                placeholder="Input field"
                                                invalid={validationErrors.name}
                                                className={`mt-2`}
                                            />
                                            <InvalidFeedback msg={validationErrors.name}/>
                                        </div>

                                        <div>
                                            <label>Status</label>
                                            <BasicSelect
                                                name='status'
                                                value={data.status}
                                                placeholder="Select One..."
                                                className={`mt-2`}
                                                options={selectOptions}
                                                invalid={validationErrors.status}
                                                onChange={(e) => {
                                                    handleChange('status', e.target.value)
                                                }}
                                                onBlur={() => handleBlur('status')}
                                            />
                                            <InvalidFeedback msg={validationErrors.status}/>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <BasicButton
                                            type="submit"
                                            theme={"success"}
                                            disabled={processing}
                                            className="mt-8 w-1/6">
                                            {processing ? "Saving..." : "Save"}
                                        </BasicButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>




                <div className={`fixed inset-0 z-50 transition-all duration-300 ${openModal ? 'visible' : 'invisible'}`}>
                    <div className={`absolute top-0 right-0 h-screen w-full bg-black/50 transition-opacity duration-300 ${openModal ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setOpenModal(false)}
                    >

                    </div>
                    <div className={`absolute left-1/2 transform top-[10%] w-[30%] h-auto bg-white rounded-md transition-transform duration-300 ${
                        openModal ? '-translate-x-1/2 translate-y-0 opacity-100' : '-translate-x-1/2 -translate-y-full opacity-0'
                    }`}>
                        <div className="m-5 flex items-start justify-center gap-2">
                            <div className="p-4 bg-red-200 rounded-full">
                                <FiAlertTriangle className="text-[40px] text-red-500" />
                            </div>
                            <div className="pl-2 flex-1 flex-column">
                                <div className="flex-1 p-2 border-b border-b-gray-300">
                                    <h3 className="text-2xl font-semibold">Delete Confirmation</h3>
                                </div>
                                <div className="flex-1 p-2 text-gray-500">
                                    <p>Are you sure you want to delete subcategory <span className="text-permanent-red">{subcategory?.name}</span>? This data will be permanently removed. This action cannot be undone.</p>
                                </div>
                                <div className="mt-6 flex justify-end gap-4">
                                    <BasicButton onClick={() => setOpenModal(false)}>
                                        Cancel
                                    </BasicButton>
                                    <BasicButton
                                        onClick={(e) => handleDeleteItem(e, subcategory)}
                                        theme={"danger"}
                                    >
                                        Delete
                                    </BasicButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

SubcategoryIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>

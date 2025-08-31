import AdminLayout from "@/layouts/AdminLayout.jsx";


export default function AdminDashboard() {
    return (
        <>
            this is dashboard
        </>
    )
}

// Tell Inertia to wrap this page in AdminLayout
AdminDashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;

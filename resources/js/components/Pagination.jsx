import { Link } from "@inertiajs/react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ links }) => {
    return (
        <div className="flex justify-end mt-4 space-x-2">
            {links.map((link, index) => {
                // Replace Previous/Next labels with icons
                let label = link.label;
                if (label.includes("Previous")) {
                    label = <MdKeyboardDoubleArrowLeft size={18} />;
                } else if (label.includes("Next")) {
                    label = <MdKeyboardDoubleArrowRight size={18} />;
                } else {
                    // For page numbers, keep as text (or convert to number)
                    label = <span dangerouslySetInnerHTML={{ __html: label }} />;
                }

                return (
                    <Link
                        key={index}
                        href={link.url || "#"}
                        className={`px-3 py-1 rounded-md border flex items-center justify-center ${
                            link.active
                                ? "bg-permanent-blue text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        } ${!link.url && "opacity-50 cursor-not-allowed"}`}
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );
};

export default Pagination;

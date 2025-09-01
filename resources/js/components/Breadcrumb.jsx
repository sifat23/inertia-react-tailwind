import {Link} from "@inertiajs/react";

const Breadcrumb = ({items = []}) => {
    if (!items || items.length === 0) return null;

    return (
        <ul className="flex items-center mt-2 text-sm">
            {items.map((item, i) => (
                <li key={i}>
                    {item.link ? (
                        <Link href={item.link}>
                            {item.label}
                        </Link>
                    ) : (
                        <span>{item.label}</span>
                    )}

                    {i < items.length - 1 && (
                        <span className="mx-2 text-xs">/</span>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default Breadcrumb;

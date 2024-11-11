import { Link } from "@inertiajs/react";
import RightArrowIcon from "../Icons/RightArrowIcon";

export default function SectionTitle({ title }) {
    return (
        <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold">{title}</div>
            <Link href="#" className="flex gap-1 text-red-500 font-semibold">
                <span>See all</span>
                <RightArrowIcon />
            </Link>
        </div>
    );
}

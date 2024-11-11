import { Link } from "@inertiajs/react";
import RightArrowIcon from "../Icons/RightArrowIcon";

export default function SectionTitle({ title, displaySeeAll = true }) {
    return (
        <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold">{title}</div>
            {displaySeeAll ? (
                <Link
                    href="#"
                    className="flex gap-1 text-red-500 font-semibold"
                >
                    <span>See all</span>
                    <RightArrowIcon />
                </Link>
            ) : (
                ""
            )}
        </div>
    );
}

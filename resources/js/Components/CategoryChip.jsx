import { Chip } from "@nextui-org/react";
import categoryColors from "../Data/categoryColors";

const CategoryChip = ({ category, padding = "0" }) => {
    const chipColor = categoryColors[category] || "warning";

    return (
        <Chip color={chipColor} variant="flat" className={`p-${padding}`}>
            {category}
        </Chip>
    );
};

export default CategoryChip;

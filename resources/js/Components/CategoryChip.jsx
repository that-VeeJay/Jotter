import { Chip } from "@nextui-org/react";
import categoryColors from "../Data/categoryColors";

const CategoryChip = ({ category }) => {
    const chipColor = categoryColors[category] || "warning";

    return (
        <Chip color={chipColor} variant="flat">
            {category}
        </Chip>
    );
};

export default CategoryChip;

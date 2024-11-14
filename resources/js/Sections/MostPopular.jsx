import { Card, Chip } from "@nextui-org/react";
import SectionTitle from "../Components/SectionTitle";
import categoryColors from "../Data/categoryColors";

const PostCard = () => {
    return (
        <Card className="space-y-2 border-1 p-5 shadow-none dark:border-zinc-700">
            <Chip color="danger" variant="flat">
                Travel
            </Chip>
            <h3 className="text-lg font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
                nostrum!
            </h3>
            <div className="flex gap-3 text-sm">
                <p>John Doe</p>
                <span>•</span>
                <p>January 10, 2011</p>
            </div>
        </Card>
    );
};

const CategoryChip = ({ categoriesList, colors }) => {
    return (
        <div className="flex flex-wrap gap-3">
            {categoriesList.map((category) => {
                const chipColor = colors[category.title] || "warning";
                return (
                    <Chip
                        color={chipColor}
                        key={category.id}
                        variant="flat"
                        className="px-4 py-5"
                    >
                        {category.title}
                    </Chip>
                );
            })}
        </div>
    );
};

export default function MostPopular({ categories }) {
    return (
        <section className="lg:col-span space-y-10">
            <div>
                <span>What's hot</span>
                <SectionTitle title="Most Popular" displaySeeAll={false} />

                <div className="mt-6 space-y-3">
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </div>
            </div>

            <div>
                <span>Discover by topic</span>
                <SectionTitle title="Categories" displaySeeAll={false} />

                <div className="mt-6 flex flex-wrap gap-3">
                    <CategoryChip
                        categoriesList={categories}
                        colors={categoryColors} 
                    />
                </div>
            </div>
        </section>
    );
}

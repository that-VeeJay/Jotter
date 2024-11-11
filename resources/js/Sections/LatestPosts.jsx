import { useState } from "react";
import { Avatar, Card, Chip, Image } from "@nextui-org/react";
import categoryColors from "../Data/categoryColors";
import SectionTitle from "../Components/SectionTitle";
import placeholderImage from "../assets/placeholder_image.png";

// Function to format date
const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
};

// Chip Component to apply color based on category
const CategoryChip = ({ category }) => {
    const chipColor = categoryColors[category] || "warning";
    return (
        <Chip color={chipColor} variant="flat">
            {category}
        </Chip>
    );
};

// PostCard Component to render each post
const PostCard = ({ post }) => {
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageLoad = () => setImageLoading(false);

    return (
        <Card
            key={post.id}
            className="p-3 grid grid-cols-1 lg:grid-cols-2 shadow-none border-1 dark:border-zinc-700"
        >
            <Image
                isLoading={imageLoading}
                onLoad={handleImageLoad}
                src={post.image || placeholderImage}
                isBlurred
                className="aspect-video md:w-screen object-cover lg:aspect-square xl:aspect-video"
            />
            <div className="space-y-3 px-5 py-3 lg:px-7 lg:py-8 lg:flex lg:flex-col lg:justify-between xl:px-6 xl:py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar size="sm" />
                        <p className="font-medium text-sm">{post.user.name}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-500">
                        {formatDate(post.published_at)}
                    </p>
                </div>
                <h3 className="font-semibold text-xl line-clamp-2">
                    {post.title}
                </h3>
                <p className="line-clamp-3 text-sm">{post.body}</p>
                <div className="flex items-center gap-3">
                    <CategoryChip category={post.category.title} />
                    <span>•</span>
                    <p className="text-sm font-medium text-gray-500">
                        {post.read_time + " min read"}
                    </p>
                </div>
            </div>
        </Card>
    );
};

// LatestPosts Component to render the list of posts
export default function LatestPosts({ latestPosts }) {
    return (
        <section className="space-y-5 lg:col-span-2">
            <SectionTitle title="Latest Posts" displaySeeAll={false} />
            <div className="space-y-5">
                {latestPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}

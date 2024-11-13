import { useState } from "react";
import { Avatar, Card, Chip, Image } from "@nextui-org/react";
import categoryColors from "../Data/categoryColors";
import SectionTitle from "../Components/SectionTitle";
import placeholderImage from "../assets/placeholder_image.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "@inertiajs/react";
import CategoryChip from "../Components/CategoryChip";

// Day JS
dayjs.extend(relativeTime);
const convertToISOFormat = (dateString) => {
    return dateString.replace(" ", "T") + "Z";
};

// Regular expression to strip HTML tags
const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
};

// PostCard Component to render each post
const PostCard = ({ post }) => {
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageLoad = () => setImageLoading(false);

    // Use dayjs to format the 'published_at' date as a relative time
    const publishedDate = dayjs(
        convertToISOFormat(post.published_at),
    ).fromNow();

    return (
        <Link href={`/post/${post.id}`}>
            <Card
                key={post.id}
                className="mb-5 grid grid-cols-1 border-1 p-3 shadow-none dark:border-zinc-800 lg:grid-cols-2"
            >
                <Image
                    isLoading={imageLoading}
                    onLoad={handleImageLoad}
                    src={post.image || placeholderImage}
                    isBlurred
                    className="aspect-video object-cover md:w-screen lg:aspect-square xl:aspect-video"
                />
                <div className="space-y-3 px-5 py-3 lg:flex lg:flex-col lg:justify-between lg:px-7 lg:py-8 xl:px-6 xl:py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar size="sm" />
                            <p className="text-sm font-medium">
                                {post.user.name}
                            </p>
                        </div>
                        <p className="text-sm font-medium text-gray-500">
                            {publishedDate}
                        </p>
                    </div>
                    <h3 className="line-clamp-2 text-xl font-semibold">
                        {post.title}
                    </h3>
                    <p className="line-clamp-3 text-sm">
                        {stripHtmlTags(post.body)}
                    </p>
                    <div className="flex items-center gap-3">
                        <CategoryChip category={post.category.title} />
                        <span>•</span>
                        <p className="text-sm font-medium text-gray-500">
                            {post.read_time + " min read"}
                        </p>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

// LatestPosts Component to render the list of posts
export default function LatestPosts({ latestPosts }) {
    return (
        <section className="space-y-5 lg:col-span-2">
            <SectionTitle title="Latest Posts" displaySeeAll={false} />
            <div>
                {latestPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}

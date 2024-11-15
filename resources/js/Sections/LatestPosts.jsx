import { useEffect, useState } from "react";
import {
    Avatar,
    Card,
    Chip,
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
    Tooltip,
    User,
} from "@nextui-org/react";
import categoryColors from "../Data/categoryColors";
import SectionTitle from "../Components/SectionTitle";
import placeholderImage from "../assets/placeholder_image.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "@inertiajs/react";
import CategoryChip from "../Components/CategoryChip";
import UserInfoCard from "../Components/UserInfoCard";

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
const PostCard = ({ post, savedTheme }) => {
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageLoad = () => setImageLoading(false);

    // Use dayjs to format the 'published_at' date as a relative time
    const publishedDate = dayjs(
        convertToISOFormat(post.published_at),
    ).fromNow();

    return (
        <Card
            key={post.id}
            className="mb-5 grid grid-cols-1 border-1 p-3 shadow-none dark:border-zinc-800 lg:grid-cols-2"
        >
            <Link href={`post/${post.id}`}>
                <Image
                    isLoading={imageLoading}
                    onLoad={handleImageLoad}
                    src={
                        post.image ? `uploads/${post.image}` : placeholderImage
                    }
                    isBlurred
                    className="aspect-video object-cover md:w-screen lg:aspect-square xl:aspect-video"
                />
            </Link>
            <div className="space-y-3 px-5 py-3 lg:flex lg:flex-col lg:justify-between lg:px-7 lg:py-8 xl:px-6 xl:py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger>
                                <User
                                    as="button"
                                    name={post.user.name}
                                    className="mb-3 transition-transform xl:mb-0"
                                    avatarProps={{
                                        src: `/profiles/${post.user.profile_picture}`,
                                        size: "sm",
                                    }}
                                />
                            </PopoverTrigger>
                            <PopoverContent
                                className={
                                    savedTheme === "dark" ? "dark" : "light"
                                }
                            >
                                <UserInfoCard user={post.user} />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <p className="text-sm font-medium text-gray-500">
                        {publishedDate}
                    </p>
                </div>
                <Link href={`post/${post.id}`}>
                    <h3 className="line-clamp-2 text-xl font-semibold text-black transition-all duration-300 hover:text-opacity-60 dark:text-white dark:hover:text-opacity-60">
                        {post.title}
                    </h3>
                </Link>
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
    );
};

export default function LatestPosts({ latestPosts }) {
    const [savedTheme, setSavedTheme] = useState(null);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        setSavedTheme(theme);
    }, []);

    return (
        <section className="space-y-5 lg:col-span-2">
            <SectionTitle title="Latest Posts" displaySeeAll={false} />
            <div>
                {latestPosts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        savedTheme={savedTheme}
                    />
                ))}
            </div>
        </section>
    );
}

import { Card, Image, Avatar, Chip } from "@nextui-org/react";
import SectionTitle from "../Components/SectionTitle";
import post1 from "../assets/posts/post1.jpg";
import post2 from "../assets/posts/post2.jpg";

const PostCard = () => {
    return (
        <Card className="p-3 grid grid-cols-1 lg:grid-cols-2 shadow-none border-1 dark:border-zinc-700">
            <Image
                src={post2}
                isBlurred
                className="aspect-video object-cover lg:aspect-square xl:aspect-video"
            />
            <div className="space-y-3 px-5 py-3 lg:px-7 lg:py-8 lg:flex lg:flex-col lg:justify-between xl:px-6 xl:py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar size="sm" />
                        <p className="font-medium text-sm">John Doe</p>
                    </div>
                    <p className="text-sm font-medium text-gray-500">
                        12 mins ago
                    </p>
                </div>
                <h3 className="font-semibold text-xl line-clamp-2">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dolorem, delectus.
                </h3>
                <p className="line-clamp-3 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia architecto obcaecati asperiores optio voluptas
                    fugiat velit distinctio iusto incidunt veniam.
                </p>
                <div className="flex items-center gap-3">
                    <Chip color="danger" variant="flat">
                        Travel
                    </Chip>
                    <span>•</span>
                    <p className="text-sm font-medium text-gray-500">
                        4 min read
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default function LatestPosts() {
    return (
        <section className="space-y-5 lg:col-span-2">
            <SectionTitle title="Latest Posts" displaySeeAll={false} />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </section>
    );
}

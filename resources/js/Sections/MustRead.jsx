import { Card, Image, Avatar, Chip } from "@nextui-org/react";
import SectionTitle from "../Components/SectionTitle";
import post1 from "../assets/posts/post1.jpg";
import post2 from "../assets/posts/post2.jpg";

const PostCard = () => {
    return (
        <Card className="space-y-3 border-1 p-3 shadow-none dark:border-zinc-700">
            <Image src={post2} isBlurred className="aspect-4/3 object-cover" />
            <div className="space-y-3 p-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar size="sm" />
                        <p className="text-sm font-medium">John Doe</p>
                    </div>
                    <p className="text-sm font-medium text-gray-500">
                        12 mins ago
                    </p>
                </div>
                <h3 className="line-clamp-3 text-xl font-semibold">
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

export default function MustRead() {
    return (
        <section className="space-y-5">
            <SectionTitle title="Must Read" />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </section>
    );
}

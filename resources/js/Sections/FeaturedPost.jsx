import { Avatar, Chip, Image } from "@nextui-org/react";
import post2 from "../assets/posts/post2.jpg";
import userProfile from "../assets/userProfile.jpg";

export default function FeaturedPost() {
    return (
        <section>
            <div className="grid lg:grid-cols-2">
                <Image
                    isBlurred
                    src={post2}
                    className="object-cover w-full aspect-4/3 rounded-xl"
                />
                <div className="p-5 xl:p-10 flex flex-col justify-between gap-3 lg:gap-0">
                    {/* User */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar src={userProfile} isBordered size="md" />
                            <p className="">John Doe</p>
                        </div>
                        <p>12 mins ago</p>
                    </div>
                    {/* Content */}
                    <h3 className="text-xl md:text-2xl xl:text-4xl font-semibold line-clamp-3">
                        Lorem, ipsum dolor sit amet consect adicing elit.
                    </h3>
                    <p className="lg:text-lg line-clamp-4">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Sit libero recusandae aliquam animi numquam
                        accusamus et autem fugiat architecto facere? Lorem ipsum
                        dolor sit, amet consectetur adipisicing elit. Et, error.
                    </p>
                    {/* Post Meta */}
                    <div className="flex items-center gap-3">
                        <Chip color="danger" variant="flat">
                            Travel
                        </Chip>
                        <span>•</span>
                        <p>4 min read</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

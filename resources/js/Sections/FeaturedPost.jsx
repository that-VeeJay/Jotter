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
                    className="aspect-4/3 w-full rounded-xl object-cover"
                />
                <div className="flex flex-col justify-between gap-3 p-5 lg:gap-0 xl:p-10">
                    {/* User */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar src={userProfile} isBordered size="md" />
                            <p className="">John Doe</p>
                        </div>
                        <p>12 mins ago</p>
                    </div>
                    {/* Content */}
                    <h3 className="line-clamp-3 text-xl font-semibold md:text-2xl xl:text-4xl">
                        Lorem, ipsum dolor sit amet consect adicing elit.
                    </h3>
                    <p className="line-clamp-4 lg:text-lg">
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

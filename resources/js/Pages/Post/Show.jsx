import SectionTitle from "../../Components/SectionTitle";
import NavLayout from "../../Layout/NavLayout";
import { Image, User } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import CategoryChip from "../../Components/CategoryChip";

const RelatedPosts = ({ relatedPosts }) => {
    return (
        <>
            {relatedPosts.map((post) => (
                <Card className="space-y-2 border-1 p-5 shadow-none dark:border-zinc-700">
                    <CategoryChip category={post.category.title} />
                    <h3 className="text-lg font-medium">{post.title}</h3>
                    <div className="flex gap-3 text-sm">
                        <p>{post.user.name}</p>
                        <span>•</span>
                        <p>
                            {new Date(post.published_at).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                },
                            )}
                        </p>
                    </div>
                </Card>
            ))}
        </>
    );
};

export default function Show({ post, relatedPosts }) {
    return (
        <div className="container mx-auto pt-28">
            <div className="grid grid-cols-3">
                <div className="col-span-3">
                    <div className="grid lg:grid-cols-2">
                        <Image
                            isBlurred
                            src={`/${post.image}`}
                            className="aspect-[3/2] object-cover"
                        />
                        <div className="space-y-5 p-5 lg:p-10">
                            <h1 className="text-xl font-medium lg:text-2xl xl:text-4xl">
                                {post.title}
                            </h1>
                            <User
                                name={post.user.name}
                                avatarProps={{
                                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                }}
                                className="font-semibold"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-3 lg:col-span-2 lg:pr-14">
                    <div className="show-article dark:prose-invert prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: post.body }} />
                    </div>

                    <SectionTitle title="COMMENTS" displaySeeAll={false} />
                </div>
                <div className="col-span-1 hidden space-y-3 lg:block">
                    <SectionTitle title="Related Posts" displaySeeAll={false} />
                    <RelatedPosts relatedPosts={relatedPosts} />
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => (
    <NavLayout
        children={page}
        showFooter={false}
        isAuthenticated={page.props.isAuthenticated}
        user={page.props.user}
    />
);

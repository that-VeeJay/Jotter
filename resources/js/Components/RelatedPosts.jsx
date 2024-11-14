import { Card, Link } from "@nextui-org/react";

import CategoryChip from "./CategoryChip";
import FormattedDate from "./FormattedDate";

const RelatedPosts = ({ relatedPosts }) => {
    return (
        <>
            {relatedPosts.map((post) => (
                <Link
                    href={`/post/${post.id}`}
                    key={post.id}
                    className="w-full"
                >
                    <Card className="w-full space-y-2 border-1 p-5 shadow-none dark:border-zinc-700">
                        <CategoryChip category={post.category.title} />
                        <h3 className="text-lg font-medium">{post.title}</h3>
                        <div className="flex gap-3 text-sm">
                            <p>{post.user.name}</p>
                            <span>•</span>
                            <p>
                                <FormattedDate date={post.published_at} />
                            </p>
                        </div>
                    </Card>
                </Link>
            ))}
        </>
    );
};

export default RelatedPosts;

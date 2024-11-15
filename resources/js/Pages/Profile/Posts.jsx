import { Card, Image } from "@nextui-org/react";
import { Link } from "@inertiajs/react";

export default function Post({ posts }) {
    return (
        <section className="grid grid-cols-2 gap-3 gap-y-3 p-3 md:grid-cols-3 md:gap-y-5 lg:grid-cols-4 xl:grid-cols-5">
            {posts.map((post) => (
                <Link key={post.id} href={`/post/${post.id}`}>
                    <Card className="group relative w-fit">
                        <div className="absolute inset-0 z-20 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>
                        <Image
                            src={`/uploads/${post.image}`}
                            className="aspect-square object-cover"
                            width={250}
                        />

                        {/* Show paragraph only on hover */}
                        <div className="px-3">
                            <p className="absolute bottom-2 z-30 line-clamp-3 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {post.title}
                            </p>
                        </div>
                    </Card>
                </Link>
            ))}
        </section>
    );
}

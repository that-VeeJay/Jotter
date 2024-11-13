import { useForm } from "@inertiajs/react";
import { Image, User } from "@nextui-org/react";
import {
    Button,
    Card,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Spinner,
    Link,
} from "@nextui-org/react";
import NavLayout from "../../Layout/NavLayout";
import SectionTitle from "../../Components/SectionTitle";
import CategoryChip from "../../Components/CategoryChip";
import FormattedDate from "../../Components/FormattedDate";

const RelatedPosts = ({ relatedPosts }) => {
    return (
        <>
            {relatedPosts.map((post) => (
                <Link href={`/post/${post.id}`} key={post.id}>
                    <Card className="space-y-2 border-1 p-5 shadow-none dark:border-zinc-700">
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

export default function Show({ post, relatedPosts, isAuthenticated, user }) {
    const { delete: destroy, processing } = useForm();

    const handleDeletePost = (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this post?")) {
            destroy(`/post/${post.id}`);
        }
    };

    return (
        <div className="container mx-auto pt-28">
            <div className="grid grid-cols-3">
                <div className="col-span-3">
                    <div className="grid lg:grid-cols-2">
                        <Image
                            isBlurred
                            src={`/uploads/${post.image}`}
                            className="aspect-[3/2] object-cover"
                        />
                        <div className="flex flex-col items-start justify-center space-y-5 p-5 lg:p-10">
                            <CategoryChip category={post.category.title} />

                            <h1 className="text-xl font-medium lg:text-2xl xl:text-4xl">
                                {post.title}
                            </h1>

                            <div className="flex w-full justify-between">
                                <div className="flex items-center gap-5">
                                    <User
                                        name={post.user.name}
                                        avatarProps={{
                                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                        }}
                                        className="font-semibold"
                                    />
                                    <span>•</span>
                                    <p>
                                        <FormattedDate
                                            date={post.published_at}
                                        />
                                    </p>
                                </div>
                                {isAuthenticated &&
                                    user?.id === post.user.id && (
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button
                                                    isDisabled={processing}
                                                    variant="flat"
                                                >
                                                    {processing ? (
                                                        <Spinner
                                                            size="sm"
                                                            color="default"
                                                        ></Spinner>
                                                    ) : (
                                                        "Actions"
                                                    )}
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Static Actions">
                                                <DropdownItem
                                                    key="new"
                                                    as={Link}
                                                    href={`/posts/${post.id}/edit`}
                                                    className="text-gray-900"
                                                >
                                                    Update
                                                </DropdownItem>

                                                <DropdownItem
                                                    key="delete"
                                                    className="text-danger"
                                                    color="danger"
                                                    onClick={handleDeletePost}
                                                >
                                                    Delete
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    )}
                            </div>
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

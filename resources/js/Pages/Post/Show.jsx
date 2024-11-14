import { useEffect, useRef } from "react";
import { toast, Toaster } from "sonner";
import { Image, User } from "@nextui-org/react";
import { useForm, usePage } from "@inertiajs/react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Link,
    Spinner,
} from "@nextui-org/react";
import Comments from "./Comments";
import NavLayout from "../../Layout/NavLayout";
import SectionTitle from "../../Components/SectionTitle";
import CategoryChip from "../../Components/CategoryChip";
import RelatedPosts from "../../Components/RelatedPosts";
import FormattedDate from "../../Components/FormattedDate";

export default function Show({
    post,
    relatedPosts,
    isAuthenticated,
    user,
    comments,
}) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }
    }, [flash.success]);

    const {
        delete: destroy,
        processing,
        data,
        setData,
        post: postReq,
        errors,
    } = useForm({
        body: "",
    });

    const handleDeletePost = (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this post?")) {
            destroy(`/post/${post.id}`);
        }
    };

    const inputRef = useRef(null);

    const handleCommentSubmission = (e) => {
        e.preventDefault();
        postReq(`/posts/${post.id}/comments`, {
            onSuccess: () => {
                setData("body", "");
                inputRef.current?.focus();
            },
        });
    };

    const handleDeleteComment = (commentId) => {
        postReq(
            `/comments/${commentId}`,
            { _method: "DELETE" },
            {
                onSuccess: () => {
                    comments = comments.filter(
                        (comment) => comment.id !== commentId,
                    );
                },
            },
        );
    };

    return (
        <div className="container mx-auto pt-28">
            <Toaster />
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
                                        <Dropdown showArrow>
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
                    <div className="show-article dark:prose-invert prose mb-24 max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: post.body }} />
                    </div>

                    <SectionTitle
                        title={`${comments.length} COMMENTS`}
                        displaySeeAll={false}
                    />

                    <div className="mt-8">
                        <form onSubmit={handleCommentSubmission}>
                            <Input
                                ref={inputRef}
                                name="comment"
                                value={data.body}
                                onChange={(e) =>
                                    setData("body", e.target.value)
                                }
                                type="text"
                                variant="underlined"
                                placeholder="Add a comment"
                            />
                            {errors.body && (
                                <span className="text-small text-red-500">
                                    {errors.body}
                                </span>
                            )}

                            <div className="mt-5 flex justify-end gap-1">
                                <Button
                                    type="button"
                                    onClick={() => setData("body", "")}
                                    className="bg-transparent text-gray-400"
                                >
                                    clear
                                </Button>

                                <Button
                                    type="submit"
                                    isDisabled={processing}
                                    className="bg-red-400 text-white"
                                >
                                    {processing ? (
                                        <Spinner size="sm" color="danger" />
                                    ) : (
                                        <span> Comment </span>
                                    )}
                                </Button>
                            </div>
                        </form>

                        {/* Comments */}
                        <div className="space-y-2 pt-10">
                            <Comments
                                comments={comments}
                                onDeleteComment={handleDeleteComment}
                                authenticatedUser={user}
                            />
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                </div>
                <div className="col-span-1 hidden space-y-3 lg:block">
                    <SectionTitle title="Related Posts" displaySeeAll={false} />
                    {Object.keys(relatedPosts).length !== 0 ? (
                        <RelatedPosts relatedPosts={relatedPosts} />
                    ) : (
                        <div className="text-center text-gray-500">
                            No posts to show
                        </div>
                    )}
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

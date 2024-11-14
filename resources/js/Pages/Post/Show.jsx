import { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import { Image, User } from "@nextui-org/react";
import {
    Avatar,
    Button,
    Card,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Link,
    Spinner,
} from "@nextui-org/react";
import NavLayout from "../../Layout/NavLayout";
import { VerticalDots } from "../../Icons/VerticalDots";
import SectionTitle from "../../Components/SectionTitle";
import CategoryChip from "../../Components/CategoryChip";
import FormattedDate from "../../Components/FormattedDate";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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

const Comments = ({ comments, onDeleteComment, authenticatedUser }) => {
    const [editingCommentId, setEditingCommentId] = useState(null);

    const { data, setData, put, processing } = useForm({
        body: "",
    });

    const inputRef = useRef(null);

    const handleCommentUpdate = (e, commentId) => {
        e.preventDefault();
        put(`/comments/${commentId}`, {
            onSuccess: () => {
                setEditingCommentId(null);
                inputRef.current?.focus();
            },
        });
    };

    dayjs.extend(relativeTime);

    const convertToISOFormat = (dateString) => {
        return dayjs(dateString).toISOString();
    };

    return (
        <>
            {comments.length === 0 ? (
                <div className="text-sm text-gray-400">No comments yet</div>
            ) : (
                comments.map((comment) => (
                    <Card
                        key={comment.id}
                        className="p-5 shadow-none dark:bg-black"
                    >
                        <div className="grid grid-cols-[auto,1fr,6rem] gap-4">
                            <Avatar
                                showFallback
                                name={comment.user.name}
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            />
                            <div>
                                <div className="flex items-center gap-3">
                                    <p className="text-sm font-semibold">
                                        {comment.user.name}
                                    </p>
                                    <span className="text-tiny text-gray-400">
                                        {dayjs(
                                            convertToISOFormat(
                                                comment.created_at,
                                            ),
                                        ).fromNow()}
                                    </span>
                                </div>

                                {editingCommentId === comment.id ? (
                                    <>
                                        <form
                                            onSubmit={(e) =>
                                                handleCommentUpdate(
                                                    e,
                                                    comment.id,
                                                )
                                            }
                                        >
                                            <Input
                                                ref={inputRef}
                                                variant="underlined"
                                                value={data.body}
                                                onChange={(e) =>
                                                    setData(
                                                        "body",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <div className="flex justify-end gap-5 pt-3">
                                                <Link
                                                    onClick={() =>
                                                        setEditingCommentId(
                                                            null,
                                                        )
                                                    }
                                                    className="hover:pointer cursor-pointer text-tiny text-gray-400"
                                                >
                                                    cancel
                                                </Link>
                                                <Button
                                                    type="submit"
                                                    size="sm"
                                                    isDisabled={processing}
                                                    className="bg-red-400 text-white"
                                                >
                                                    {processing ? (
                                                        <Spinner
                                                            size="sm"
                                                            color="danger"
                                                        />
                                                    ) : (
                                                        <span> Save </span>
                                                    )}
                                                </Button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    <p className="text-sm md:text-base">
                                        {comment.body}
                                    </p>
                                )}
                            </div>

                            {authenticatedUser?.id === comment.user.id ? (
                                <Dropdown showArrow>
                                    <DropdownTrigger>
                                        <Button
                                            variant="light"
                                            className="m-0 flex h-12 w-12 items-center justify-center rounded-full p-0 text-xl"
                                        >
                                            <VerticalDots
                                                isDarkMode={true}
                                                width="15"
                                                height="15"
                                            />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Static Actions">
                                        <DropdownItem
                                            onClick={() => {
                                                setEditingCommentId(comment.id);
                                                setData("body", comment.body);
                                            }}
                                            key="edit"
                                        >
                                            Edit
                                        </DropdownItem>

                                        <DropdownItem
                                            key="delete"
                                            className="text-danger"
                                            color="danger"
                                            onClick={() =>
                                                onDeleteComment(comment.id)
                                            }
                                        >
                                            Delete
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            ) : (
                                <Dropdown showArrow>
                                    <DropdownTrigger>
                                        <Button
                                            variant="light"
                                            className="m-0 flex h-12 w-12 items-center justify-center rounded-full p-0 text-xl"
                                        >
                                            <VerticalDots
                                                isDarkMode={true}
                                                width="15"
                                                height="15"
                                            />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Static Actions">
                                        <DropdownItem key="report">
                                            Report
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            )}
                        </div>
                    </Card>
                ))
            )}
        </>
    );
};

export default function Show({
    post,
    relatedPosts,
    isAuthenticated,
    user,
    comments,
}) {
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
                    <div className="show-article dark:prose-invert prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: post.body }} />
                    </div>

                    <SectionTitle
                        title={`${comments.length} COMMENTS`}
                        displaySeeAll={false}
                    />

                    <div className="mt-8">
                        <form onSubmit={handleCommentSubmission}>
                            <Input
                                //! DEMO
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

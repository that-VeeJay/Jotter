import { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
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
import { VerticalDots } from "../../Icons/VerticalDots";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
                                src={`/profiles/${comment.user.profile_picture}`}
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

export default Comments;

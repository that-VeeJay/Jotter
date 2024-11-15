import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    // Link,
} from "@nextui-org/react";
import React from "react";
import { usePage, Link } from "@inertiajs/react";

export default function UserInfoCard({ user }) {
    const [isFollowed, setIsFollowed] = React.useState(false);

    const { auth } = usePage().props;
    const isCurrentUser = auth.user && auth.user.id === user.id;

    return (
        <Card
            shadow="none"
            className="max-w-[300px] border-none dark:bg-zinc-900"
        >
            <CardHeader className="justify-between">
                <div className="flex gap-3">
                    <Link
                        href={
                            isCurrentUser
                                ? "/profile"
                                : `/profile/user/${user.id}`
                        }
                        className="flex gap-3"
                    >
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={`/profiles/${user.profile_picture}`}
                        />
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                                {user.name}
                            </h4>
                        </div>
                    </Link>
                </div>
                <Button
                    className={
                        isFollowed
                            ? "border-default-200 bg-transparent text-foreground"
                            : ""
                    }
                    color="danger"
                    radius="full"
                    size="sm"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
                >
                    {isFollowed ? "Unfollow" : "Follow"}
                </Button>
            </CardHeader>
            <CardBody className="px-3 py-0">
                <p className="line-clamp-2 pl-px text-small text-default-500">
                    {user.bio}
                </p>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="text-small font-semibold text-default-600">
                        4
                    </p>
                    <p className="text-small text-default-500">Following</p>
                </div>
                <div className="flex gap-1">
                    <p className="text-small font-semibold text-default-600">
                        97.1K
                    </p>
                    <p className="text-small text-default-500">Followers</p>
                </div>
            </CardFooter>
        </Card>
    );
}

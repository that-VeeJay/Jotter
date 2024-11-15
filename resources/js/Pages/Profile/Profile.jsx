import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import { usePage } from "@inertiajs/react";
import { Avatar, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Posts from "../Profile/Posts";
import Account from "../Profile/Account";
import NavLayout from "../../Layout/NavLayout";
import EditProfileButton from "../../Components/EditProfileButton";

export default function Profile({
    user: loggedInUser,
    authenticatedUserPosts: posts,
}) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }
    }, [flash]);

    return (
        <div className="container mx-auto min-h-screen py-24">
            <Toaster />
            <div className="space-y-10">
                <div className="grid items-center gap-3 md:grid-cols-[auto_1fr_auto] md:gap-10">
                    <Avatar
                        isBordered
                        src={`/profiles/${loggedInUser.profile_picture}`}
                        size="lg"
                        name={loggedInUser.name}
                        className="h-32 w-32 text-large"
                    />
                    <div className="space-y-2">
                        <p className="text-3xl font-semibold">
                            {loggedInUser.name}
                        </p>
                        <p className="text-sm xl:w-1/2">{loggedInUser.bio}</p>
                    </div>

                    {/* Edit Profile Button */}
                    <div>
                        <EditProfileButton />
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex w-full flex-col">
                    <Tabs aria-label="Options" disabledKeys={["wip"]}>
                        <Tab key="posts" title="Posts">
                            <Posts posts={posts} />
                        </Tab>
                        <Tab key="account" title="Account">
                            <Account />
                        </Tab>
                        <Tab key="wip" title="WIP">
                            <Card>
                                <CardBody>
                                    Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt
                                    mollit anim id est laborum.
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

Profile.layout = (page) => (
    <NavLayout
        children={page}
        isAuthenticated={page.props.isAuthenticated}
        user={page.props.user}
        showFooter={false}
    />
);

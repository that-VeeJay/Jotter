import NavLayout from "../Layout/NavLayout";
import { Avatar, Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import EditProfileButton from "../Components/EditProfileButton";
import { toast, Toaster } from "sonner";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Profile({ user: loggedInUser }) {
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
                    <Tabs aria-label="Options">
                        <Tab key="posts" title="Posts">
                            <Card>
                                <CardBody>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="account" title="Account">
                            <Card>
                                <CardBody>
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat. Duis aute irure
                                    dolor in reprehenderit in voluptate velit
                                    esse cillum dolore eu fugiat nulla pariatur.
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="videos" title="Videos">
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

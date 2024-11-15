import NavLayout from "../../Layout/NavLayout";
import { Toaster } from "sonner";
import { Avatar, Tab, Tabs } from "@nextui-org/react";
import { VisitProfilePost } from "./VisitProfilePost";

export default function VisitProfile({ visitedUser, posts }) {
    return (
        <div className="container mx-auto min-h-screen py-24">
            <Toaster />
            <div className="space-y-10">
                <div className="grid items-center gap-3 md:grid-cols-[auto_1fr_auto] md:gap-10">
                    <Avatar
                        isBordered
                        src={`/profiles/${visitedUser.profile_picture}`}
                        size="lg"
                        name={visitedUser.name}
                        className="h-32 w-32 text-large"
                    />
                    <div className="space-y-2">
                        <p className="text-3xl font-semibold">
                            {visitedUser.name}
                        </p>
                        <p className="text-sm xl:w-1/2">{visitedUser.bio}</p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex w-full flex-col">
                    <Tabs aria-label="Options" disabledKeys={["account"]}>
                        <Tab key="posts" title="Posts">
                            <VisitProfilePost posts={posts} />
                        </Tab>
                        <Tab key="account" title="Account">
                            {/* <Account /> */}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

VisitProfile.layout = (page) => (
    <NavLayout
        children={page}
        isAuthenticated={page.props.isAuthenticated}
        user={page.props.user}
    />
);

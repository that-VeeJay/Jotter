import { Button, Card, Input } from "@nextui-org/react";

export default function Account() {
    return (
        <section className="space-y-5">
            <Card className="space-y-5 p-5">
                <div className="space-y-1">
                    <h3 className="text-xl font-semibold">
                        Profile Information
                    </h3>
                    <p className="text-sm">Update your account's email</p>
                </div>
                <Input type="email" label="Email" className="lg:w-1/2" />
                <Button className="w-fit bg-black text-white dark:bg-zinc-800 dark:hover:bg-zinc-700">
                    Save
                </Button>
            </Card>

            <Card className="space-y-5 p-5">
                <div className="space-y-1">
                    <h3 className="text-xl font-semibold">Update Password</h3>
                    <p className="text-sm">
                        Ensure your account is using a long, random password to
                        stay secure
                    </p>
                </div>
                <Input
                    type="password"
                    label="Current Password"
                    className="lg:w-1/2"
                />
                <Input
                    type="password"
                    label="New Password"
                    className="lg:w-1/2"
                />
                <Input
                    type="password"
                    label="Confirm Password"
                    className="lg:w-1/2"
                />
                <Button className="w-fit bg-black text-white dark:bg-zinc-800 dark:hover:bg-zinc-700">
                    Save
                </Button>
            </Card>

            <Card className="space-y-5 p-5">
                <div className="space-y-1">
                    <h3 className="text-xl font-semibold">Delete Account</h3>
                    <p className="text-sm lg:w-1/2">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Before deleting your
                        account, please download any data or information that
                        you wish to retain.
                    </p>
                </div>
                <Button className="w-fit bg-red-600 text-white">
                    Delete Account
                </Button>
            </Card>
        </section>
    );
}

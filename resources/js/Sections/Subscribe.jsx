import { Button, Card, Input } from "@nextui-org/react";
import { MailIcon } from "../Icons/MailIcon";

export default function Subscribe() {
    return (
        <section>
            <Card className="p-10 grid grid-cols-1 gap-5 text-center items-center lg:p-14 lg:grid-cols-2 lg:text-left">
                <div className="space-y-3">
                    <p className="text-sm text-gray-500 lg:text-base tracking-widest font-medium">
                        GET FIRST UPDATE
                    </p>
                    <h3 className="text-xl lg:text-2xl font-semibold">
                        Be the first to know <br />
                        <span className="text-red-500">subscribe✍🏻</span>
                        for our latest updates!
                    </h3>
                </div>
                <div className="flex gap-3">
                    <Input
                        type="email"
                        placeholder="you@example.com"
                        startContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                    <Button className="bg-red-500 text-white">Subscribe</Button>
                </div>
            </Card>
        </section>
    );
}

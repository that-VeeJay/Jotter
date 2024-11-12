import { Button, Card, Input } from "@nextui-org/react";
import { MailIcon } from "../Icons/MailIcon";

export default function Subscribe() {
    return (
        <section>
            <Card className="grid grid-cols-1 items-center gap-5 p-10 text-center lg:grid-cols-2 lg:p-14 lg:text-left">
                <div className="space-y-3">
                    <p className="text-sm font-medium tracking-widest text-gray-500 lg:text-base">
                        GET FIRST UPDATE
                    </p>
                    <h3 className="text-xl font-semibold lg:text-2xl">
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
                            <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                        }
                    />
                    <Button className="bg-red-500 text-white">Subscribe</Button>
                </div>
            </Card>
        </section>
    );
}

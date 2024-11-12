import { Card } from "@nextui-org/react";

export default function Bulletin() {
    return (
        <section>
            <Card className="space-y-3 p-8 text-center md:p-10">
                <p className="text-sm font-medium tracking-widest text-gray-500 lg:text-base">
                    WELCOME TO JOTTER
                </p>
                <h3 className="text-medium font-semibold md:text-xl lg:text-2xl">
                    Craft narratives✍🏻 that ignite{" "}
                    <span className="text-red-500">inspiration</span>💡, <br />{" "}
                    <span className="text-red-500">knowledge</span>📕, and{" "}
                    <span className="text-red-500">entertainment</span>🎬
                </h3>
            </Card>
        </section>
    );
}

import { Card } from "@nextui-org/react";

export default function Bulletin() {
    return (
        <section>
            <Card className="p-8 md:p-10 text-center space-y-3">
                <p className="text-sm text-gray-500 lg:text-base tracking-widest font-medium">
                    WELCOME TO JOTTER
                </p>
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
                    Craft narratives✍🏻 that ignite{" "}
                    <span className="text-red-500">inspiration</span>💡, <br />{" "}
                    <span className="text-red-500">knowledge</span>📕, and{" "}
                    <span className="text-red-500">entertainment</span>🎬
                </h3>
            </Card>
        </section>
    );
}

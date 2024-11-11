import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Button, Card, Input } from "@nextui-org/react";
import { JotterLogo } from "../../Icons/JotterLogo";
import { EyeFilledIcon } from "../../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../Icons/EyeSlashFilledIcon";

export default function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState(false);

    const togglePasswordVisibility = () =>
        setIsPasswordVisible(!isPasswordVisible);
    const toggleConfirmPasswordVisibility = () =>
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    return (
        <section>
            <div className="flex flex-col items-center justify-center min-h-screen space-y-5">
                <div className="flex items-center">
                    <JotterLogo width="50" height="50" />
                    <h3 className="text-2xl font-semibold">JOTTER</h3>
                </div>
                <Card className="w-[28rem] p-10 space-y-6">
                    <h1 class="text-2xl font-semibold">Login</h1>
                    <Input
                        isClearable
                        type="email"
                        label="Email"
                        variant="bordered"
                        placeholder="example@gmail.com"
                        onClear={() => console.log("input cleared")}
                        className="w-full"
                    />
                    <Input
                        label="Password"
                        variant="bordered"
                        placeholder="••••••••••••"
                        endContent={
                            <button
                                className="focus:outline-none"
                                type="button"
                                onClick={togglePasswordVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isPasswordVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isPasswordVisible ? "text" : "password"}
                        className="w-full"
                    />

                    <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
                        <p className="font-medium">Login</p>
                    </Button>
                    <div>
                        <span className="text-gray-500">
                            Don't have an account?
                        </span>{" "}
                        <Link
                            href="/sign-up"
                            className="text-zinc-700 font-medium"
                        >
                            Register here
                        </Link>
                    </div>
                </Card>
            </div>
        </section>
    );
}

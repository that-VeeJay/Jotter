import { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button, Card, Input, Spinner } from "@nextui-org/react";
import { JotterLogo } from "../../Icons/JotterLogo";
import { EyeFilledIcon } from "../../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../Icons/EyeSlashFilledIcon";

function ErrorMessage({ error }) {
    return error ? (
        <span className="mt-1 text-sm text-red-500">{error}</span>
    ) : null;
}

export default function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () =>
        setIsPasswordVisible(!isPasswordVisible);

    const initialFieldValue = { email: "", password: "" };

    const { data, setData, post, errors, processing } =
        useForm(initialFieldValue);

    const submit = (e) => {
        e.preventDefault();
        post("/login", {
            onSuccess: () => setData(initialFieldValue),
        });
    };

    return (
        <section>
            <div className="flex min-h-screen flex-col items-center justify-center space-y-5">
                <div className="flex items-center">
                    <JotterLogo width="50" height="50" />
                    <h3 className="text-2xl font-semibold">JOTTER</h3>
                </div>
                <Card className="w-[28rem] space-y-6 p-10">
                    <h1 className="text-2xl font-semibold">Login</h1>
                    <form onSubmit={submit} className="space-y-5">
                        <Input
                            type="email"
                            label="Email"
                            variant="flat"
                            className="w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <ErrorMessage error={errors.email} />

                        <Input
                            label="Password"
                            variant="flat"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    aria-label="toggle password visibility"
                                >
                                    {isPasswordVisible ? (
                                        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                                    ) : (
                                        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                                    )}
                                </button>
                            }
                            type={isPasswordVisible ? "text" : "password"}
                            className="w-full"
                        />
                        <ErrorMessage error={errors.password} />

                        <Button
                            type="submit"
                            isDisabled={processing}
                            className={`w-full text-white ${
                                processing
                                    ? "bg-gray-400"
                                    : "bg-zinc-900 hover:bg-zinc-800"
                            }`}
                        >
                            {processing ? (
                                <Spinner color="default" size="sm" />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>
                    <div>
                        <span className="text-gray-500">
                            Don't have an account?
                        </span>{" "}
                        <Link
                            href="/register"
                            className="font-medium text-zinc-700"
                        >
                            Register here
                        </Link>
                    </div>
                </Card>
            </div>
        </section>
    );
}

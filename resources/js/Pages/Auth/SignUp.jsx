import { useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Button, Card, Input, Spinner } from "@nextui-org/react";
import { CheckMark } from "../../Icons/CheckMark";
import { JotterLogo } from "../../Icons/JotterLogo";
import { EyeFilledIcon } from "../../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../Icons/EyeSlashFilledIcon";

function PasswordInput({ label, value, onChange, error }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () =>
        setIsPasswordVisible(!isPasswordVisible);

    return (
        <div>
            <Input
                label={label}
                variant="flat"
                value={value}
                onChange={onChange}
                type={isPasswordVisible ? "text" : "password"}
                endContent={
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label={`toggle ${label} visibility`}
                        className="focus:outline-none"
                    >
                        {isPasswordVisible ? (
                            <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                        ) : (
                            <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                        )}
                    </button>
                }
                className="w-full"
            />
            {error && (
                <span className="mt-1 text-sm text-red-500">{error}</span>
            )}
        </div>
    );
}

function ErrorMessage({ error }) {
    return error ? (
        <span className="mt-1 text-sm text-red-500">{error}</span>
    ) : null;
}

export default function SignUp() {
    const { flash } = usePage().props;

    const initialFieldValue = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const { data, setData, post, errors, processing } =
        useForm(initialFieldValue);

    const submit = (e) => {
        e.preventDefault();
        post("/register", {
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
                <Card className="w-[28rem] space-y-6 p-10 shadow-none md:shadow-lg">
                    <h1 className="text-2xl font-semibold">
                        Create an account
                    </h1>
                    {flash.success && (
                        <span className="flex items-center gap-2 rounded-lg bg-green-500 bg-opacity-25 p-3 text-green-600">
                            <CheckMark
                                width="20"
                                height="20"
                                strokeColor="#16a34a"
                            />
                            {flash.success}
                        </span>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <Input
                            label="Name"
                            variant="flat"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full"
                        />
                        <ErrorMessage error={errors.name} />

                        <Input
                            label="Email"
                            variant="flat"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full"
                        />
                        <ErrorMessage error={errors.email} />

                        <PasswordInput
                            label="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            error={errors.password}
                        />

                        <PasswordInput
                            label="Confirm Password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            error={errors.password_confirmation}
                        />

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
                                "Create an account"
                            )}
                        </Button>
                    </form>

                    <div>
                        <span className="text-gray-500">
                            Already have an account?
                        </span>{" "}
                        <Link
                            href="/login"
                            className="font-medium text-zinc-700"
                        >
                            Login here
                        </Link>
                    </div>
                </Card>
            </div>
        </section>
    );
}

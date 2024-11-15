import { useEffect, useState } from "react";
import {
    Button,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure,
    Spinner,
} from "@nextui-org/react";
import { CloudIcon } from "../Icons/CloudIcon";
import { useForm } from "@inertiajs/react";
import ReactLoading from "react-loading";

export default function EditProfileButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [fileName, setFileName] = useState("");

    const initialValue = { profile_picture: null, name: "", bio: "" };
    const { data, setData, errors, put, post, processing } =
        useForm(initialValue);

    useEffect(() => {
        setFileName("");
        setData(initialValue);
    }, [isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setData("profile_picture", file);
        }
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        post("/profile/update", { _method: "PUT" });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (file) {
            setFileName(file.name);
            setData("profile_picture", file);
        }
    };

    const savedTheme = localStorage.getItem("theme");

    return (
        <>
            <Button onPress={onOpen} color="danger" isDisabled={processing}>
                {!processing ? (
                    <span>Edit profile</span>
                ) : (
                    <ReactLoading
                        type="bubbles"
                        width={40}
                        height={40}
                        color="#fff"
                    />
                )}
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                className={savedTheme === "light" ? "light" : "dark"}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
                                Update Profile
                            </ModalHeader>
                            <form onSubmit={handleFormSubmission}>
                                <ModalBody>
                                    <p className="text-sm dark:text-gray-300">
                                        Profile Picture
                                    </p>
                                    <div class="flex w-full items-center justify-center">
                                        <label
                                            htmlFor="dropzone-file"
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop}
                                            for="dropzone-file"
                                            class="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
                                        >
                                            <div class="flex flex-col items-center justify-center pb-6 pt-5">
                                                <CloudIcon
                                                    width="30"
                                                    height="30"
                                                />
                                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span class="font-semibold">
                                                        Click to upload
                                                    </span>{" "}
                                                    or drag and drop
                                                </p>
                                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                                    PNG, JPG or JPEG
                                                </p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                class="hidden"
                                                name="profile_picture"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                    {fileName && (
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Selected file: {fileName}
                                        </p>
                                    )}

                                    <Input
                                        label="Update name"
                                        variant="flat"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <Textarea
                                        variant="flat"
                                        label="Add bio"
                                        className="w-full"
                                        maxLength={180}
                                        value={data.bio}
                                        onChange={(e) =>
                                            setData("bio", e.target.value)
                                        }
                                    />
                                    <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                                        {data.bio.length}/180 characters
                                    </div>
                                </ModalBody>
                                <ModalFooter className="space-x-3">
                                    <Link
                                        variant="flat"
                                        onPress={onClose}
                                        className="cursor-pointer text-sm text-gray-400"
                                    >
                                        cancel
                                    </Link>
                                    <Button
                                        isDisabled={processing}
                                        type="submit"
                                        color="danger"
                                        onPress={onClose}
                                    >
                                        Save Changes
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

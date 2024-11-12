import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Card, Input, Select, SelectItem } from "@nextui-org/react";
import NavLayout from "../../Layout/NavLayout";
import { UploadIcon } from "../../Icons/UploadIcon";
import "react-quill/dist/quill.bubble.css";

// Image Upload component
const ImageUpload = ({
    selectedImage,
    setSelectedImage,
    imageError,
    handleFileChange,
}) => {
    return (
        <div className="flex w-full items-center justify-center">
            <label
                htmlFor="dropzone-file"
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
            >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <UploadIcon />
                    {imageError ? (
                        <div className="mt-2 text-sm text-red-500">
                            <p>{imageError}</p>
                        </div>
                    ) : (
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or JPEG (MAX. 800x400px)
                    </p>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};

// Image Preview component
const ImagePreview = ({ selectedImage }) => {
    if (!selectedImage) {
        return (
            <label className="flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-sm font-semibold text-gray-400 hover:bg-gray-100 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-zinc-500 dark:hover:bg-zinc-900 md:h-full">
                Image preview
            </label>
        );
    }

    return (
        <div className="relative">
            <img
                src={selectedImage}
                alt="Preview"
                className="h-36 w-full rounded-lg object-cover"
            />
            <span className="absolute bottom-1 left-1 rounded-full bg-gray-900 bg-opacity-75 p-1 text-tiny text-white">
                not the actual size*
            </span>
        </div>
    );
};

const Create = ({ categories }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageError, setImageError] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
            if (!allowedTypes.includes(file.type)) {
                setImageError("Only PNG, JPG, or JPEG files are allowed.");
                setSelectedImage(null);
            } else {
                setImageError("");
                const fileURL = URL.createObjectURL(file);
                setSelectedImage(fileURL);
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center pt-24">
            <Card className="w-[50rem] space-y-5 border-1 p-10 shadow-none dark:border-zinc-800">
                <div>
                    <label>Title</label>
                    <Input type="text" />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <ImageUpload
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        imageError={imageError}
                        handleFileChange={handleFileChange}
                    />
                    <ImagePreview selectedImage={selectedImage} />
                </div>

                <div>
                    <Select label="Select a category" className="w-1/2">
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.title}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                <div>
                    <label>Share your story</label>
                    <ReactQuill
                        theme="bubble"
                        value=""
                        className="react-quill h-96 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800"
                    />
                </div>

                <div className="text-right">
                    <button className="group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800">
                        <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                            Publish
                        </span>
                    </button>
                </div>
            </Card>
        </div>
    );
};

Create.layout = (page) => (
    <NavLayout
        children={page}
        isAuthenticated={page.props.isAuthenticated}
        user={page.props.user}
        showFooter={false}
    />
);

export default Create;

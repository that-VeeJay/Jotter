import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useForm, Link } from "@inertiajs/react";
import { Card, Input, Select, SelectItem } from "@nextui-org/react";
import NavLayout from "../../Layout/NavLayout";
import { readTime } from "../../Data/readTime";
import "react-quill/dist/quill.bubble.css";

const Create = ({ categories }) => {
    const initialFieldValue = {
        title: "",
        image: null,
        category: "",
        read_time: "",
        body: "",
    };

    const { data, setData, post, errors, processing } =
        useForm(initialFieldValue);

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            // Create a preview of the image
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        post("/create", {
            onSuccess: () => {
                setData({ ...initialFieldValue });
                setImagePreview(null); // Clear image preview after submission
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center pt-16">
            <Card className="w-[50rem] border-1 p-10 shadow-none dark:border-zinc-800">
                <form onSubmit={handleFormSubmission} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label>Title</label>
                        <Input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        {errors.title && (
                            <span className="text-small text-red-500">
                                {errors.title}
                            </span>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex w-full items-center justify-center">
                            <label
                                htmlFor="dropzone-file"
                                className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
                            >
                                <div className="flex flex-col items-center justify-center pb-3 pt-3">
                                    <svg
                                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        PNG, JPG or JPEG (MAX. 5mb)
                                    </p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    name="image"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>

                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Image Preview"
                                    className="aspect-video w-full rounded-lg object-cover"
                                />
                                <span className="absolute bottom-1 left-1 rounded-full bg-red-900 bg-opacity-50 px-2 py-1 text-tiny text-white">
                                    not the actual size
                                </span>
                            </div>
                        ) : (
                            <>
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 py-5 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
                                >
                                    <span className="text-sm text-gray-400">
                                        Image Preview
                                    </span>
                                </label>
                            </>
                        )}
                    </div>

                    {errors.image ? (
                        <span className="text-small text-red-500">
                            {errors.image}
                        </span>
                    ) : (
                        <span className="text-tiny text-gray-400">
                            Once published, image cannot be updated.
                        </span>
                    )}

                    <div className="grid grid-cols-2 gap-5">
                        {/* Category Dropdown */}
                        <div>
                            <Select
                                label="Select a category"
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                            >
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.title}
                                    </SelectItem>
                                ))}
                            </Select>
                            {errors.category && (
                                <span className="block text-small text-red-500">
                                    {errors.category}
                                </span>
                            )}
                        </div>

                        {/* Read Time Dropdown */}
                        <div>
                            <Select
                                value={data.read_time}
                                onChange={(e) =>
                                    setData("read_time", e.target.value)
                                }
                                label="Read Time"
                                className="w-full"
                            >
                                {readTime.map((time) => (
                                    <SelectItem key={time.key}>
                                        {time.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            {errors.read_time && (
                                <span className="block text-small text-red-500">
                                    {errors.read_time}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Body Text Area */}
                    <div>
                        <label>Share your story</label>
                        <ReactQuill
                            theme="bubble"
                            name="body"
                            value={data.body}
                            onChange={(value) => setData("body", value)}
                            className="react-quill h-72 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800"
                        />
                    </div>
                    {errors.body && (
                        <span className="text-small text-red-500">
                            {errors.body}
                        </span>
                    )}

                    {/* Publish Button */}
                    <div className="flex items-center justify-end gap-6">
                        <Link href="/" className="text-sm text-gray-400">
                            Cancel
                        </Link>
                        <div className="text-right">
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
                            >
                                <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                                    Publish
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
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

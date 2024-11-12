import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useForm } from "@inertiajs/react";
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

    const handleFormSubmission = (e) => {
        e.preventDefault();
        post("/create", {
            onSuccess: () => {
                setData({ ...initialFieldValue });
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center pt-10">
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
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => setData("image", e.target.files[0])}
                        className="block"
                    />
                    {errors.image && (
                        <span className="text-small text-red-500">
                            {errors.image}
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
                                className="max-w-xs"
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
                            className="react-quill h-96 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800"
                        />
                    </div>
                    {errors.body && (
                        <span className="text-small text-red-500">
                            {errors.body}
                        </span>
                    )}

                    {/* Publish Button */}
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

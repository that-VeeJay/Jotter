import { useEffect } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { usePage } from "@inertiajs/react";
import NavLayout from "../Layout/NavLayout";
import Bulletin from "../Sections/Bulletin";
import MustRead from "../Sections/MustRead";
import Subscribe from "../Sections/Subscribe";
import LatestPosts from "../Sections/LatestPosts";
import MostPopular from "../Sections/MostPopular";
import FeaturedPost from "../Sections/FeaturedPost";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ latestPosts }) {
    const { flash } = usePage().props;

    const savedTheme = localStorage.getItem("theme");

    // Post success message
    useEffect(() => {
        const toastOptions = {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Bounce,
            theme: savedTheme,
            font: "Poppins",
        };

        if (flash) {
            const message = flash.success || flash.error;
            const toastType = flash.success ? toast.success : toast.error;

            toastType(message, toastOptions);
        }
    }, [flash]);

    return (
        <div className="container mx-auto space-y-10 pt-24">
            <Bulletin />
            <FeaturedPost />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <LatestPosts latestPosts={latestPosts} />
                <MostPopular />
            </div>
            <ToastContainer />
            <MustRead />
            <Subscribe />
        </div>
    );
}

Home.layout = (page) => (
    <NavLayout
        children={page}
        isAuthenticated={page.props.isAuthenticated}
        user={page.props.user}
    />
);

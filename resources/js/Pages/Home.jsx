import NavLayout from "../Layout/NavLayout";
import Bulletin from "../Sections/Bulletin";
import FeaturedPost from "../Sections/FeaturedPost";
import LatestPosts from "../Sections/LatestPosts";

export default function Home() {
    return (
        <div className="container mx-auto space-y-8">
            <Bulletin />
            <FeaturedPost />
            <LatestPosts />
            <h1>---</h1>
            <h1>---</h1>
            <h1>---</h1>
            <h1>---</h1>
            <h1>---</h1>
            <h1>---</h1>
            <h1>---</h1>
            <h1>---</h1>
        </div>
    );
}

Home.layout = (page) => <NavLayout children={page} />;

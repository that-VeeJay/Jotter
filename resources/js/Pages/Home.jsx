import NavLayout from "../Layout/NavLayout";
import Bulletin from "../Sections/Bulletin";
import FeaturedPost from "../Sections/FeaturedPost";
import LatestPosts from "../Sections/LatestPosts";
import Subscribe from "../Sections/Subscribe";

export default function Home() {
    return (
        <div className="container mx-auto space-y-8 pt-24">
            <Bulletin />
            <FeaturedPost />
            <LatestPosts />
            <Subscribe />

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}

Home.layout = (page) => <NavLayout children={page} />;

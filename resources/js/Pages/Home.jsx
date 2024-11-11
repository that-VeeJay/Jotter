import NavLayout from "../Layout/NavLayout";
import Bulletin from "../Sections/Bulletin";
import FeaturedPost from "../Sections/FeaturedPost";
import LatestPosts from "../Sections/LatestPosts";
import MostPopular from "../Sections/MostPopular";
import MustRead from "../Sections/MustRead";
import Subscribe from "../Sections/Subscribe";

export default function Home() {
    return (
        <div className="container mx-auto space-y-10 pt-24">
            <Bulletin />
            <FeaturedPost />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <LatestPosts />
                <MostPopular />
            </div>

            <MustRead />
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

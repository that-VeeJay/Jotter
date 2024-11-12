import NavLayout from "../Layout/NavLayout";
import Bulletin from "../Sections/Bulletin";
import MustRead from "../Sections/MustRead";
import Subscribe from "../Sections/Subscribe";
import LatestPosts from "../Sections/LatestPosts";
import MostPopular from "../Sections/MostPopular";
import FeaturedPost from "../Sections/FeaturedPost";

export default function Home({ latestPosts, isAuthenticated, user }) {
    return (
        <div className="container mx-auto space-y-10 pt-24">
            <Bulletin />
            <FeaturedPost />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <LatestPosts latestPosts={latestPosts} />
                <MostPopular />
            </div>

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

import NavLayout from "../Layout/NavLayout";
import Bulletin from "../Sections/Bulletin";
import FeaturedPost from "../Sections/FeaturedPost";

export default function Home() {
    return (
        <div className="container mx-auto space-y-8">
            <Bulletin />
            <FeaturedPost />
        </div>
    );
}

Home.layout = (page) => <NavLayout children={page} />;

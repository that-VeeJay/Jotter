import NavLayout from "../Layout/NavLayout";
import Bulletin from "../Sections/Bulletin";

export default function Home() {
    return (
        <>
            <Bulletin />
        </>
    );
}

Home.layout = (page) => <NavLayout children={page} />;

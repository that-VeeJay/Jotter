import NavLayout from "../Layout/NavLayout";

export default function Creators() {
    return (
        <>
            <div className="min-h-screen pt-24">
                <div className="text-center text-3xl font-semibold">
                    CREATOR PAGE
                </div>
            </div>
        </>
    );
}

Creators.layout = (page) => (
    <NavLayout
        children={page}
        isAuthenticated={page.props.isAuthenticated}
        user={page.props.user}
    />
);

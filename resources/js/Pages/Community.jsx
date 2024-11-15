import NavLayout from "../Layout/NavLayout";

export default function Community() {
    return (
        <>
            <div className="min-h-screen pt-24">
                <div className="text-center text-3xl font-semibold">
                    COMMUNITY PAGE
                </div>
            </div>
        </>
    );
}

Community.layout = (page) => (
    <NavLayout
        children={page}
        isAuthenticated={page.props.isAuthenticated}
        user={page.props.user}
    />
);

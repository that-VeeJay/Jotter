const FormattedDate = ({ date }) => {
    return (
        <span>
            {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })}
        </span>
    );
};

export default FormattedDate;

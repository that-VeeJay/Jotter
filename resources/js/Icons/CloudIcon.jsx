export const CloudIcon = ({
    width = "20",
    height = "20",
    isDarkMode = false,
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 20 16"
        fill="none"
        aria-hidden="true"
        className="mb-4"
    >
        <path
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            // stroke={isDarkMode ? "#9CA3AF" : "#4B5563"}
            stroke="#9CA3AF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
    </svg>
);

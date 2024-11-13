export const InfoIcon = ({ isDarkMode, width = "20", height = "20" }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
    >
        <path
            fill={isDarkMode ? "white" : "black"}
            fillRule="evenodd"
            d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z"
        />
    </svg>
);
